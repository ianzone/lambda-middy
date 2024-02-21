import { error, gatewayV2 } from 'src/utils';

export const handler = gatewayV2.handler(async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World' }),
  };
});
