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

describe('extractEventObjectDefinitionsFromHtml', () => {
  it('extracts an entity', () => {
    // Arrange
    const html = EVENT_SECTION_HTML;
    const expectedEntity1: Record<string, IExtractedEntity> = {
      'event.request': {
        id: 'event.request',
        type: 'object',
        descriptions: ['Details about the request that initiated the transaction.'],
      },
    };

    // Act
    const actualEntity = extractDefinitionsFromHtml(html, EPageKind.EventObject);

    // Assert
    assert.partialDeepStrictEqual(actualEntity, expectedEntity1);
  });
  it('extracts entity properties', () => {
    // Arrange
    const html = EVENT_SECTION_HTML;
    const expectedEntity1: Record<string, IExtractedEntity> = {
      'event.request.geoip': {
        id: 'event.request.geoip',
        type: 'object',
        descriptions: ['Contains geographical information about the request.'],
      },
    };
    const expectedEntity2: Record<string, IExtractedEntity> = {
      'event.request.hostname': {
        id: 'event.request.hostname',
        type: 'string',
        descriptions: ['The hostname that is being used for the authentication flow.'],
      },
    };
    const expectedEntity3: Record<string, IExtractedEntity> = {
      'event.request.hostname': {
        id: 'event.request.hostname',
        type: 'string',
        descriptions: ['The hostname that is being used for the authentication flow.'],
      },
    };
    const expectedEntity4: Record<string, IExtractedEntity> = {
      'event.request.ip': {
        id: 'event.request.ip',
        type: 'string',
        descriptions: ['The originating IP address of the request.'],
      },
    };
    const expectedEntity5: Record<string, IExtractedEntity> = {
      'event.request.language': {
        id: 'event.request.language',
        type: 'string',
        descriptions: ['The language requested by the browser.'],
      },
    };
    const expectedEntity6: Record<string, IExtractedEntity> = {
      'event.request.method': {
        id: 'event.request.method',
        type: 'string',
        descriptions: ['The HTTP method used for the request'],
      },
    };
    const expectedEntity7: Record<string, IExtractedEntity> = {
      'event.request.user_agent': {
        id: 'event.request.user_agent',
        type: 'string',
        descriptions: ['The value of the User-Agent header received when initiating the transaction.'],
      },
    };

    // Act
    const actualEntity = extractDefinitionsFromHtml(html, EPageKind.EventObject);

    // Assert
    assert.partialDeepStrictEqual(actualEntity, expectedEntity1);
    assert.partialDeepStrictEqual(actualEntity, expectedEntity2);
    assert.partialDeepStrictEqual(actualEntity, expectedEntity3);
    assert.partialDeepStrictEqual(actualEntity, expectedEntity4);
    assert.partialDeepStrictEqual(actualEntity, expectedEntity5);
    assert.partialDeepStrictEqual(actualEntity, expectedEntity6);
    assert.partialDeepStrictEqual(actualEntity, expectedEntity7);
  });
  it('extracts sub-properties of entity properties', () => {
    // Arrange
    const html = EVENT_SECTION_HTML;
    const expectedEntity1: Record<string, IExtractedEntity> = {
      'event.request.geoip.cityName': {
        id: 'event.request.geoip.cityName',
        type: 'string',
        descriptions: [],
      },
    };
    const expectedEntity2: Record<string, IExtractedEntity> = {
      'event.request.geoip.continentCode': {
        id: 'event.request.geoip.continentCode',
        type: 'string',
        descriptions: [],
      },
    };
    const expectedEntity3: Record<string, IExtractedEntity> = {
      'event.request.geoip.countryCode': {
        id: 'event.request.geoip.countryCode',
        type: 'string',
        descriptions: [],
      },
    };
    const expectedEntity4: Record<string, IExtractedEntity> = {
      'event.request.geoip.countryCode3': {
        id: 'event.request.geoip.countryCode3',
        type: 'string',
        descriptions: [],
      },
    };
    const expectedEntity5: Record<string, IExtractedEntity> = {
      'event.request.geoip.countryName': {
        id: 'event.request.geoip.countryName',
        type: 'string',
        descriptions: [],
      },
    };
    const expectedEntity6: Record<string, IExtractedEntity> = {
      'event.request.geoip.latitude': {
        id: 'event.request.geoip.latitude',
        type: 'number',
        descriptions: [],
      },
    };
    const expectedEntity7: Record<string, IExtractedEntity> = {
      'event.request.geoip.longitude': {
        id: 'event.request.geoip.longitude',
        type: 'number',
        descriptions: [],
      },
    };
    const expectedEntity8: Record<string, IExtractedEntity> = {
      'event.request.geoip.subdivisionCode': {
        id: 'event.request.geoip.subdivisionCode',
        type: 'string',
        descriptions: [],
      },
    };
    const expectedEntity9: Record<string, IExtractedEntity> = {
      'event.request.geoip.subdivisionName': {
        id: 'event.request.geoip.subdivisionName',
        type: 'string',
        descriptions: [],
      },
    };
    const expectedEntity10: Record<string, IExtractedEntity> = {
      'event.request.geoip.timeZone': {
        id: 'event.request.geoip.timeZone',
        type: 'string',
        descriptions: [],
      },
    };

    // Act
    const actualEntity = extractDefinitionsFromHtml(html, EPageKind.EventObject);

    // Assert
    assert.partialDeepStrictEqual(actualEntity, expectedEntity1);
    assert.partialDeepStrictEqual(actualEntity, expectedEntity2);
    assert.partialDeepStrictEqual(actualEntity, expectedEntity3);
    assert.partialDeepStrictEqual(actualEntity, expectedEntity4);
    assert.partialDeepStrictEqual(actualEntity, expectedEntity5);
    assert.partialDeepStrictEqual(actualEntity, expectedEntity6);
    assert.partialDeepStrictEqual(actualEntity, expectedEntity7);
    assert.partialDeepStrictEqual(actualEntity, expectedEntity8);
    assert.partialDeepStrictEqual(actualEntity, expectedEntity9);
    assert.partialDeepStrictEqual(actualEntity, expectedEntity10);
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

const EVENT_SECTION_HTML = `<table>
  <tbody>
    <tr>
      <td>
        <p><code>event.request</code></p>
        <p><em>(Optional)</em></p>
      </td>
      <td>
        <p>Details about the request that initiated the transaction.</p>
        <p>Includes the following properties:</p>
        <ul>
          <li>
            <code>geoip</code> <em>Object</em>. <span>Contains geographical information about the request.</span>
            <p>Includes the following properties:</p>
            <ul>
              <li><code>cityName</code> <em>Optional string</em>.</li>
              <li><code>continentCode</code> <em>Optional string</em>.</li>
              <li><code>countryCode</code> <em>Optional string</em>.</li>
              <li><code>countryCode3</code> <em>Optional string</em>.</li>
              <li><code>countryName</code> <em>Optional string</em>.</li>
              <li><code>latitude</code> <em>Optional number</em>.</li>
              <li><code>longitude</code> <em>Optional number</em>.</li>
              <li><code>subdivisionCode</code> <em>Optional string</em>.</li>
              <li><code>subdivisionName</code> <em>Optional string</em>.</li>
              <li><code>timeZone</code> <em>Optional string</em>.</li>
            </ul>
          </li>
          <li>
            <code>hostname</code> <em>Optional string</em>. 
            <span>The hostname that is being used for the authentication flow.</span>
          </li>
          <li>
            <code>ip</code> <em>String</em>.
            <span>The originating IP address of the request.</span>
          </li>
          <li>
            <code>language</code> <em>Optional string</em>.
            <span>The language requested by the browser.</span>
          </li>
          <li>
            <code>method</code> <em>String</em>.
            <span>The HTTP method used for the request</span>
          </li>
          <li>
            <code>user_agent</code> <em>Optional string</em>.
            <span>The value of the <code>User-Agent</code> header received when initiating the transaction.</span>
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>`;
