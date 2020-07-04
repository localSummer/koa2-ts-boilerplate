import Koa from 'koa';
import onerror from 'koa-onerror';
import cors from 'koa2-cors';
import bodyparser from 'koa-bodyparser';
import json from 'koa-json';
import koaLogger from 'koa-logger';
import koaStatic from 'koa-static';
import path from 'path';

import koaResponse from './middlewares/response';
import logger from './middlewares/logger';
import { systemLogger, defaultLogger, accessLogger } from './utils/log4';
import index from './routes';
import Helper from './utils/helper';

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
app.use(koaLogger());
// 公共资源访问
app.use(koaStatic(path.resolve(__dirname, '../public')));
// 用户上传资源访问
app.use(koaStatic(path.resolve(__dirname, '../uploads')));

// logger 控制台请求输出
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  accessLogger.info(Helper.logFormat(ctx, ms));
});

// 自定义控制台输出日志
app.use(logger(defaultLogger));
app.use(koaResponse);

// 路由
app.use(index.routes());
app.use(index.allowedMethods());

// error-handling
app.on('error', (err: Error, ctx: Koa.Context) => {
  console.error('server error', err, ctx);
  // 系统日志输出到文件
  systemLogger.error(err);
});

export default app;
