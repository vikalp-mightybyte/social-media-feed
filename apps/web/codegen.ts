import { type CodegenConfig } from '@graphql-codegen/cli';
import { resolve } from 'path';

const gqlSchemaPath = resolve(process.cwd(), '../backend/schema.gql');
console.log('schemaPath', gqlSchemaPath);

const config: CodegenConfig = {
  schema: resolve(process.cwd(), '../backend/schema.gql'),
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
