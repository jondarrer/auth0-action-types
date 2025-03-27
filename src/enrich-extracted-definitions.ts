import { IEnrichedEntity, IExtractedEntity, IExtractedFunction } from './types';

export const enrichExtractedDefinitions = (entities: Record<string, IExtractedEntity>): void => {
  for (const entityId in entities) {
    const entity = entities[entityId];

    const parentId = entityId.split('.').slice(0, -1).join('.');
    const globalName = buildGlobalName(entityId);
    let title: string;
    let extra = {};

    if (isFunction(entity)) {
      title = buildFunctionOrParamTitle(entityId);
      extra = identifyFnReturnInfo(entity);
    } else {
      const isParam = entities[parentId]?.type === 'function';

      if (isParam) {
        title = buildFunctionOrParamTitle(entityId);
      } else {
        title = buildObjectTitle(entityId);
      }
    }

    entities[entityId] = { ...entity, title, parentId, globalName, ...extra } as IEnrichedEntity;
  }
};

const isFunction = (entity: IExtractedEntity): entity is IExtractedFunction => entity.type === 'function';

const buildObjectTitle = (entityId: string): string =>
  entityId
    .split('.')
    .map((part) => capitalizeWords(part))
    .join('');

const buildGlobalName = buildObjectTitle;

const buildFunctionOrParamTitle = (entityId: string): string => entityId.split('.').slice(-1)[0] || '';

const capitalizeWords = (input: string): string => input.replace(/\b\w/g, (char) => char.toUpperCase());

const identifyFnReturnInfo = (entity: IExtractedEntity): { returnDescription: string; returnEntityType: string } => {
  const lastDescription = entity.descriptions.slice(-1)[0] || '';

  switch (lastDescription) {
    case 'Returns a CacheWriteResult object with  type: \"success\" if a value was removed from the cache. A failed operation returns type: \"error\". For errors, the returned object will have a\n      code property that indicates the nature of the failure.':
      return { returnDescription: lastDescription, returnEntityType: 'CacheWriteResult' };
    case 'Returns a cache record if an item is found in the cache for the supplied\n      key. Cache records are objects with a\n      value property holding the cached value as well as an\n      expires_at property indicating the maximum expiry of\n      the record in milliseconds since the Unix epoch.':
      return { returnDescription: lastDescription, returnEntityType: 'CacheRecord' };
    case 'Returns a reference to the api object.':
      return { returnDescription: lastDescription, returnEntityType: 'Api' };
    case 'Returns a JWT string.':
      return { returnDescription: lastDescription, returnEntityType: 'JwtString' };
    default:
      return { returnDescription: lastDescription, returnEntityType: 'unknown' };
  }
};
