import middy from '@middy/core';
import inputOutputLogger from '@middy/input-output-logger';

export function common<TEvent = unknown, TResult = any>() {
  return middy<TEvent, TResult>().use([
    // https://middy.js.org/docs/middlewares/input-output-logger
    inputOutputLogger({
      logger: (event) => {
        if (process.env.IS_OFFLINE === 'true') {
          return;
        }
        console.log(JSON.stringify(event, null, 2));
      },
      // awsContext: true,
    }),
  ]);
}
