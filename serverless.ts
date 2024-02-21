import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  app: 'app',
  service: '${self:app}-functions',

  frameworkVersion: '3',
  configValidationMode: 'error',

  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    memorySize: 512,
    architecture: 'arm64',
    timeout: 900,
    tags: {
      developer: 'ian',
      project: '${self:app}',
      service: '${self:service}',
    },
    logRetentionInDays: 60,
    environment: {
      STAGE: '${sls:stage}',
      NODE_OPTIONS: '--enable-source-maps',
    },
    iam: {
      role: {
        statements: [],
      },
    },
  },

  functions: {
    hello: {
      handler: 'src/lambdas/hello.handler',
      url: {
        cors: { allowCredentials: true },
      },
      // events: [
      //   {
      //     httpApi: '*',
      //   },
      // ],
    },
  },

  package: {
    individually: true,
  },

  // https://github.com/floydspace/serverless-esbuild
  plugins: ['serverless-esbuild', 'serverless-offline'],

  custom: {
    esbuild: {
      minify: true,
      sourcemap: true,
      packager: 'pnpm',
      exclude: [],
    },
  },
};

const functions = serverlessConfiguration.functions;
for (const name in functions) {
  if (Object.prototype.hasOwnProperty.call(functions, name)) {
    const fn = functions[name];
    if (fn.name === undefined) {
      fn.name = `\${self:app}-\${sls:stage}-${name}`;
    }
  }
}

module.exports = serverlessConfiguration;
