import { describe, it } from 'node:test';
import assert from 'node:assert';

import { enrichExtractedDefinitions } from './enrich-extracted-definitions';
import { IEnrichedEntity, IEnrichedFunction, IExtractedEntity, IExtractedFunction } from './types';

describe('extractApiObjectDefinitionsFromHtml', () => {
  it('extracts an entity', () => {
    // Arrange
    const extractedEntity1: Record<string, IExtractedEntity> = {
      'api.accessToken': {
        id: 'api.accessToken',
        type: 'object',
        descriptions: ['Request changes to the access token being issued.'],
      },
    };
    const expectedEnrichedEntity1: Record<string, IEnrichedEntity> = {
      'api.accessToken': {
        id: 'api.accessToken',
        parentId: 'api',
        title: 'ApiAccessToken',
        globalName: 'ApiAccessToken',
        type: 'object',
        descriptions: ['Request changes to the access token being issued.'],
      },
    };

    // Act
    enrichExtractedDefinitions(extractedEntity1);

    // Assert
    assert.partialDeepStrictEqual(extractedEntity1, expectedEnrichedEntity1);
  });
  it('extracts entity functions', () => {
    // Arrange
    const extractedEntity1: Record<string, IExtractedFunction> = {
      'api.accessToken.setCustomClaim': {
        id: 'api.accessToken.setCustomClaim',
        type: 'function',
        paramNames: ['name', 'value'],
        descriptions: [
          'Set a custom claim on the Access Token that will be issued upon completion\n      of the login flow.',
          'Returns a reference to the api object.',
        ],
      },
    };
    const expectedEnrichedEntity1: Record<string, IEnrichedFunction> = {
      'api.accessToken.setCustomClaim': {
        id: 'api.accessToken.setCustomClaim',
        parentId: 'api.accessToken',
        title: 'setCustomClaim',
        globalName: 'ApiAccessTokenSetCustomClaim',
        type: 'function',
        paramNames: ['name', 'value'],
        descriptions: [
          'Set a custom claim on the Access Token that will be issued upon completion\n      of the login flow.',
          'Returns a reference to the api object.',
        ],
        returnDescription: 'Returns a reference to the api object.',
        returnEntityType: 'Api',
      },
    };

    // Act
    enrichExtractedDefinitions(extractedEntity1);

    // Assert
    assert.partialDeepStrictEqual(extractedEntity1, expectedEnrichedEntity1);
  });
  it('extracts function parameters', () => {
    // Arrange
    const extractedEntity1: Record<string, IExtractedEntity | IExtractedFunction> = {
      'api.accessToken.setCustomClaim': {
        id: 'api.accessToken.setCustomClaim',
        type: 'function',
        paramNames: ['name', 'value'],
        descriptions: [
          'Set a custom claim on the Access Token that will be issued upon completion\n      of the login flow.',
          'Returns a reference to the api object.',
        ],
      },
      'api.accessToken.setCustomClaim.name': {
        id: 'api.accessToken.setCustomClaim.name',
        type: 'string',
        descriptions: [
          'String. Name of the claim (note that this may need to be a\n              fully-qualified URL).',
        ],
      },
    };
    const expectedEnrichedEntity1: Record<string, IEnrichedEntity> = {
      'api.accessToken.setCustomClaim.name': {
        id: 'api.accessToken.setCustomClaim.name',
        parentId: 'api.accessToken.setCustomClaim',
        title: 'name',
        globalName: 'ApiAccessTokenSetCustomClaimName',
        type: 'string',
        descriptions: [
          'String. Name of the claim (note that this may need to be a\n              fully-qualified URL).',
        ],
      },
    };

    // Act
    enrichExtractedDefinitions(extractedEntity1);

    // Assert
    assert.partialDeepStrictEqual(extractedEntity1, expectedEnrichedEntity1);
  });
});
