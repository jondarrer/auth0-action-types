import fs from 'node:fs';
import { parseArgs } from 'node:util';

// import { compile } from 'json-schema-to-typescript';
import { EPageKind, IExtractedEntity } from './types';
import { extractDefinitionsFromHtml } from './extract-definitions-from-html';
import { enrichExtractedDefinitions } from './enrich-extracted-definitions';

const extractAndEnrichDefinitionsFromHtml = async (
  html: string,
  kind: EPageKind
): Promise<Record<string, IExtractedEntity>> => {
  const entities = extractDefinitionsFromHtml(html, kind);
  enrichExtractedDefinitions(entities);
  return entities;
};

const main = async () => {
  try {
    const { values } = parseArgs({
      options: {
        filename: { type: 'string', short: 'f' },
        url: { type: 'string', short: 'u' },
        output: { type: 'string', short: 'o' },
        kind: { type: 'string', short: 'k', default: 'ApiObject' },
      },
    });

    let html: string;
    if (values.filename) {
      console.debug(`Reading file ${values.filename}`);
      html = fs.readFileSync(values.filename, { encoding: 'utf-8' });
    } else if (values.url) {
      console.debug(`Downloading page ${values.url}`);
      const response = await fetch(values.url);
      html = await response.text();
    } else {
      console.error(
        'Usage: Set either input filename or source url: e.g. node --import tsx src/index.ts --filename=file.html'
      );
      process.exit();
    }

    if (!values.output) {
      console.error('Usage: Set the name of the output file: e.g. node --import tsx src/index.ts --output=out.json');
      process.exit();
    }

    if (!values.kind) {
      console.error(
        'Usage: Set kind to either ApiObject (default) or EventObject: e.g. node --import tsx src/index.ts --kind=ApiObject'
      );
      process.exit();
    } else {
      if (values.kind !== EPageKind.ApiObject && values.kind !== EPageKind.EventObject) {
        console.error(
          'Usage: Set kind to either ApiObject (default) or EventObject: e.g. node --import tsx src/index.ts --kind=ApiObject'
        );
        process.exit();
      }
    }

    const result: Record<string, IExtractedEntity> = await extractAndEnrichDefinitionsFromHtml(
      html,
      values.kind as EPageKind
    );
    fs.writeFileSync(values.output, JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(error);
  }
};

main();
