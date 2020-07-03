import Koa from 'koa';

class Helper {
  static logFormat(ctx: Koa.Context, ms: number) {
    return `method:${ctx.method} path:${ctx.url} agent:${
      ctx.req.headers['user-agent']
    } request:${JSON.stringify(ctx.request.body)} duration:${ms}ms response:${JSON.stringify(
      ctx.response.body
    )}`;
  }
}

export default Helper;
