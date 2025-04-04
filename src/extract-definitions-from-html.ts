import * as cheerio from 'cheerio';

import { EPageKind, IExtractedEntity, IExtractedFunction, TTSType } from './types';

/**
 * Extracts all the necessary information to build TypeScript types
 * @param html The html containing the definitions
 * @param kind The kind of page, either Api Object or Event Object page
 * @returns
 */
export const extractDefinitionsFromHtml = (html: string, kind: EPageKind): Record<string, IExtractedEntity> => {
  const $ = cheerio.load(html);
  switch (kind) {
    case EPageKind.ApiObject:
      return extractApiObjectDefinitionsFromHtml($);
    case EPageKind.EventObject:
      return extractEventObjectDefinitionsFromHtml($);
    default:
      throw new Error(`Unexpected page kind ${kind}`);
  }
};

const fnRegex = /(.*)\((.*)\)/;
const typeRegex = /((String|Object|Any value|Array|Options|Boolean|Number)\.?)(.*)/;

export const extractApiObjectDefinitionsFromHtml = ($: cheerio.CheerioAPI): Record<string, IExtractedEntity> => {
  const extractedEntities: Record<string, IExtractedEntity> = {};
  let entity: IExtractedEntity;

  $('article section').each((_i, element) => {
    $('> h2, > h3, > p, > table', element).each((_j, child) => {
      switch (child.name) {
        case 'h2':
        case 'h3':
          let entityName = $('code', child).text().trim();
          const isFn = fnRegex.test(entityName);
          if (isFn) {
            const matches = fnRegex.exec(entityName);
            entityName = matches?.[1] || entityName;
            const paramNames = (matches?.[2] || '').split(',').map((p) => p.trim());
            entity = {
              id: entityName,
              type: 'function',
              paramNames,
              descriptions: [],
            } as IExtractedFunction;
          } else {
            entity = { id: entityName, type: 'object', descriptions: [] };
          }
          extractedEntities[entityName] = entity;
          break;
        case 'p':
          const p = $(child).text().trim();
          entity.descriptions.push(p);
          break;
        case 'table':
          $('> tbody > tr', child).each((_k, tr) => {
            let paramName = $('td:nth-child(1) code', tr).text().trim();
            const paramDescription: string[] = [];
            $('td:nth-child(2) > *', tr).each((l, d) => {
              paramDescription.push($(d).prop('innerText')?.trim() || '');
            });
            const hasTypeInfo = typeRegex.test(paramDescription[0]);
            let type = 'unknown';
            if (hasTypeInfo) {
              const firstDescription = paramDescription[0];
              const typeInfo = typeRegex.exec(firstDescription);
              type = determineTSType(typeInfo?.[2]);
            }
            paramName = `${entity.id}.${paramName}`;
            const param: IExtractedEntity = {
              id: paramName,
              type: type as TTSType,
              descriptions: paramDescription,
            };
            extractedEntities[paramName] = param;
          });
          break;
      }
    });
  });
  return extractedEntities;
};

export const extractEventObjectDefinitionsFromHtml = ($: cheerio.CheerioAPI): Record<string, IExtractedEntity> => {
  const extractedEntities: Record<string, IExtractedEntity> = {};
  let entity: IExtractedEntity;

  $('table > tbody > tr').each((_i, element) => {
    const entityName = $('td:nth-child(1) > p > code', element).text().trim();
    const entityDescription = $('td:nth-child(2) > p:nth-child(1)', element).text().trim();
    entity = {
      id: entityName,
      type: 'object',
      descriptions: [entityDescription],
    } as IExtractedEntity;
    extractedEntities[entityName] = entity;

    $('td:nth-child(2) > ul > li', element).each((_j, li) => {
      let propName = $('> code', li).text().trim();
      let propType = $('> em', li).text().trim();
      propName = `${entity.id}.${propName}`;
      propType = determineTSType(propType);
      const propDescription = $('> span', li).text().trim();
      const property = {
        id: propName,
        type: propType,
        descriptions: [propDescription],
      } as IExtractedEntity;
      extractedEntities[propName] = property;

      $('> ul > li', li).each((_k, sli) => {
        let subPropName = $('> code', sli).text().trim();
        let subPropType = $('> em', sli).text().trim();
        subPropName = `${propName}.${subPropName}`;
        subPropType = determineTSType(subPropType);
        const subProperty = {
          id: subPropName,
          type: subPropType,
          descriptions: [],
        } as IExtractedEntity;
        extractedEntities[subPropName] = subProperty;
      });
    });
  });
  return extractedEntities;
};

const determineTSType = (type: string | undefined): TTSType => {
  switch (type) {
    case 'String':
    case 'Optional string':
      return 'string';
    case 'Object':
      return 'object';
    case 'Any value':
      return 'any';
    case 'Array':
      return 'unknown[]';
    case 'Options':
      return 'object';
    case 'Boolean':
      return 'boolean';
    case 'Number':
    case 'Optional number':
      return 'number';
    case 'Dictionary':
    case 'Optional dictionary':
      return 'Map';
    case 'BooleanShould':
    // return 'BooleanShould';
    case 'StringOptional':
    // return 'StringOptional';
    default:
      return 'unknown';
  }
};
