import Koa from 'koa';
import onerror from 'koa-onerror';
import cors from 'koa2-cors';
import bodyparser from 'koa-bodyparser';
import json from 'koa-json';
import logger from 'koa-logger';
import koaStatic from 'koa-static';
import path from 'path';

import koaResponse from './middlewares/response';
import index from './routes';

const app = new Koa();

// 错误处理
onerror(app);

// 中间件
app.use(cors());
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
);
app.use(json());
app.use(logger());
app.use(koaStatic(path.resolve(__dirname, '../public')));

// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(koaResponse);

// 路由
app.use(index.routes());
app.use(index.allowedMethods());

// error-handling
app.on('error', (err: Error, ctx: Koa.Context) => {
  console.error('server error', err, ctx);
});

export default app;
