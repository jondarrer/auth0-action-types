export type TPrimitiveType = 'object' | 'array' | 'string' | 'number' | 'boolean' | 'function';

export type TTSType = TPrimitiveType | 'unknown' | 'any' | 'unknown[]' | 'Map';

export enum EPageKind {
  EventObject = 'EventObject',
  ApiObject = 'ApiObject',
}

export interface IExtractedEntity {
  id: string;
  type: TTSType;
  descriptions: string[];
}

export interface IExtractedFunction extends IExtractedEntity {
  paramNames: string[];
}

export interface IExtractedParam extends IExtractedEntity {
  fnId: string;
}

export interface IEnrichedEntity extends IExtractedEntity {
  parentId: string;
  title: string;
  globalName: string;
}

export interface IEnrichedFunction extends IEnrichedEntity, IExtractedFunction {
  returnEntityType: string;
  returnDescription: string;
}
