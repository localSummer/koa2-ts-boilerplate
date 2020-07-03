import Koa from 'koa';
import log4js from 'log4js';

const logger = (logger: log4js.Logger) => {
  return async (ctx: Koa.Context, next: Koa.Next) => {
    ctx.logger = logger;
    await next();
  };
};

export default logger;
