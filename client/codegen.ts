import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: 'http://localhost:54321/graphql',
    documents: ['src/**/*.{ts,tsx}'],
    generates: {
        'src/__gql__/': {
            preset: 'client',
            plugins: [],
            presetConfig: {
                gqlTagName: 'gql',
            },
        },
    },
};

export default config;
