import Koa from 'koa';
import log4js from 'koa-log4';

const logger = (logger: log4js.Logger) => {
  return async (ctx: Koa.Context, next: Koa.Next) => {
    ctx.logger = logger;
    await next();
  };
};

export default logger;
