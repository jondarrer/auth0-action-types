import { describe, it } from 'node:test';
import assert from 'node:assert';

import { extractDefinitionsFromHtml } from './extract-definitions-from-html';
import { EPageKind, IExtractedEntity, IExtractedFunction } from './types';

describe('extractApiObjectDefinitionsFromHtml', () => {
  it('extracts an entity', () => {
    // Arrange
    const html = API_SECTION_HTML;
    const expectedEntity1: Record<string, IExtractedEntity> = {
      'api.accessToken': {
        id: 'api.accessToken',
        type: 'object',
        descriptions: ['Request changes to the access token being issued.'],
      },
    };

    // Act
    const actualEntity = extractDefinitionsFromHtml(html, EPageKind.ApiObject);

    // Assert
    assert.partialDeepStrictEqual(actualEntity, expectedEntity1);
  });
  it('extracts entity functions', () => {
    // Arrange
    const html = API_SECTION_HTML;
    const expectedEntity1: Record<string, IExtractedFunction> = {
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
    const expectedEntity2: Record<string, IExtractedFunction> = {
      'api.accessToken.addScope': {
        id: 'api.accessToken.addScope',
        type: 'function',
        paramNames: ['scope'],
        descriptions: ['Add a scope on the Access Token that will be issued upon completion of the login flow.'],
      },
    };
    const expectedEntity3: Record<string, IExtractedFunction> = {
      'api.accessToken.removeScope': {
        id: 'api.accessToken.removeScope',
        type: 'function',
        paramNames: ['scope'],
        descriptions: ['Remove a scope on the Access Token that will be issued upon completion of the login flow.'],
      },
    };

    // Act
    const actualEntity = extractDefinitionsFromHtml(html, EPageKind.ApiObject);

    // Assert
    assert.partialDeepStrictEqual(actualEntity, expectedEntity1);
    assert.partialDeepStrictEqual(actualEntity, expectedEntity2);
    assert.partialDeepStrictEqual(actualEntity, expectedEntity3);
  });
  it('extracts function parameters', () => {
    // Arrange
    const html = API_SECTION_HTML;
    const expectedEntity1: Record<string, IExtractedEntity> = {
      'api.accessToken.setCustomClaim.name': {
        id: 'api.accessToken.setCustomClaim.name',
        type: 'string',
        descriptions: [
          'String. Name of the claim (note that this may need to be a\n              fully-qualified URL).',
        ],
      },
    };
    const expectedEntity2: Record<string, IExtractedEntity> = {
      'api.accessToken.setCustomClaim.value': {
        id: 'api.accessToken.setCustomClaim.value',
        type: 'any',
        descriptions: ['Any value. The value of the claim.'],
      },
    };
    const expectedEntity3: Record<string, IExtractedEntity> = {
      'api.accessToken.addScope.scope': {
        id: 'api.accessToken.addScope.scope',
        type: 'string',
        descriptions: ['String The scope to be added.'],
      },
    };
    const expectedEntity4: Record<string, IExtractedEntity> = {
      'api.accessToken.removeScope.scope': {
        id: 'api.accessToken.removeScope.scope',
        type: 'string',
        descriptions: ['String The scope to be removed.'],
      },
    };

    // Act
    const actualEntity = extractDefinitionsFromHtml(html, EPageKind.ApiObject);

    // Assert
    assert.partialDeepStrictEqual(actualEntity, expectedEntity1);
    assert.partialDeepStrictEqual(actualEntity, expectedEntity2);
    assert.partialDeepStrictEqual(actualEntity, expectedEntity3);
    assert.partialDeepStrictEqual(actualEntity, expectedEntity4);
  });
});

const API_SECTION_HTML = `<article>
  <section>
    <h2><code>api.accessToken</code></h2>
    <p>Request changes to the access token being issued.</p>
    <h3><code>api.accessToken.setCustomClaim(name, value)</code></h3>
    <p>
      Set a custom claim on the Access Token that will be issued upon completion
      of the login flow.
    </p>
    <p>Returns a reference to the <code>api</code> object.</p>
    <table class="table">
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>name</code></td>
          <td>
            <p>
              <em>String</em>. Name of the claim (note that this may need to be a
              fully-qualified URL).
            </p>
          </td>
        </tr>
        <tr>
          <td><code>value</code></td>
          <td>
            <p><em>Any value</em>. The value of the claim.</p>
          </td>
        </tr>
      </tbody>
    </table>
    <h3><code>api.accessToken.addScope(scope)</code></h3>
    <p>
      Add a scope on the Access Token that will be issued upon completion of the login flow.
    </p>
    <p>Returns a reference to the <code>api</code> object.</p>
    <table class="table">
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>scope</code></td>
          <td>
            <p>
              <em>String</em> The scope to be added.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
      <h3><code>api.accessToken.removeScope(scope)</code></h3>
    <p>
      Remove a scope on the Access Token that will be issued upon completion of the login flow.
    </p>
    <p>Returns a reference to the <code>api</code> object.</p>
    <table class="table">
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>scope</code></td>
          <td>
            <p>
              <em>String</em> The scope to be removed.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</article>`;
