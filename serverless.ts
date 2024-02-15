import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  app: 'app-name',
  service: '${self:app}-endpoints',

  frameworkVersion: '3',
  configValidationMode: 'error',

  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    architecture: 'arm64',
    timeout: 900,
    tags: {
      developer: 'ian',
      project: '${self:app}',
      service: '${self:service}',
    },
    logRetentionInDays: 60,
    environment: {
      NODE_OPTIONS: '--enable-source-maps',
    },
    iam: {
      role: {
        statements: [],
      },
    },
  },

  package: {
    individually: true,
  },

  functions: {
    hello: {
      handler: 'src/hello.handler',
      url: {
        cors: { allowCredentials: true },
      },
      events: [
        {
          httpApi: {
            method: 'ANY',
            path: '/',
          },
        },
      ],
    },
  },

  // https://github.com/floydspace/serverless-esbuild
  plugins: ['serverless-esbuild', 'serverless-offline'],

  custom: {
    esbuild: {
      bundle: true,
      minify: true,
      sourcemap: true,
      packager: 'pnpm',
      exclude: [],
    },
  },
};

module.exports = serverlessConfiguration;
