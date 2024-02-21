import httpContentNegotiation from '@middy/http-content-negotiation';
import httpErrorHandler from '@middy/http-error-handler';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import {
  APIGatewayProxyEvent,
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  APIGatewayProxyResultV2,
} from 'aws-lambda';
import error from 'http-errors';
import { common } from './common';

function httpAdapter<TEvent = unknown, TResult = any>() {
  return common<TEvent, TResult>().use([
    // Headers
    httpHeaderNormalizer(), //https://middy.js.org/docs/middlewares/http-header-normalizer
    httpContentNegotiation(), //https://middy.js.org/docs/middlewares/http-content-negotiation

    // Exception
    httpErrorHandler({
      fallbackMessage: 'Internal server error',
    }),
  ]);
}

const gateway = httpAdapter<APIGatewayProxyEvent, APIGatewayProxyResult>();
const gatewayV2 = httpAdapter<APIGatewayProxyEventV2, APIGatewayProxyResultV2>();

// https://github.com/jshttp/http-errors#readme
export { gateway, gatewayV2, error };
