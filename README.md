### 技术栈
koa2 + typescript + sequelize + sequelize-cli + mysql + log4js + pm2 + gulp

### 功能支持
1. typescript
2. sequelize orm
3. log4js 日志处理
4. @koa/multer 文件上传
5. schema-typed 请求参数校验
6. ctx 自定义参数（及类型）扩展 `ctx.success` `ctx.error` `ctx.logger`

> 注意：

### 数据库操作
1. `npx sequelize db:create --charset "utf8mb4" --collate "utf8mb4_general_ci"` 同步数据库
2. `npx sequelize db:migrate` 同步表

### 项目启动
#### dev 模式
1. `npm run compile` 编译后 nodemon 重启服务 或 `gulp-compile` 编译后延迟 `200ms（可配置）` nodemon 重启服务
2. `npm run dev`

#### prd模式
1. `npm run build` 打包但代码未进行压缩 或 `npm run gulp-build`  打包并压缩
2. `npm run prd`

#### scripts
```javascript
"scripts": {
  "compile": "npx tsc --project tsconfig.json -w",
  "dev": "cross-env NODE_ENV=development npx nodemon bin/www",
  "build": "npx tsc --project tsconfig.json",
  "prd": "cross-env NODE_ENV=production npx pm2 start bin/www",
  "clear": "rm -r dist",
  "eslint": "npx eslint src --ext .ts",
  "gulp-compile": "npx gulp dev",
  "gulp-build": "npx gulp build"
},
```

#### 目录结构
```
|-- koa2-ts
    |-- .eslintignore
    |-- .eslintrc.js
    |-- .gitignore
    |-- .sequelizerc
    |-- LICENCE
    |-- README.md
    |-- gulpfile.js
    |-- package-lock.json
    |-- package.json
    |-- prettier.config.js
    |-- tsconfig.json
    |-- bin
    |   |-- www
    |-- config
    |   |-- constant.js
    |   |-- db.json
    |-- db
    |   |-- migrations
    |   |   |-- 20200702123744-create-user.js
    |   |-- seeders
    |-- logs
    |   |-- access.log-2020-07-02.log
    |   |-- access.log.-2020-07-03.log
    |   |-- application.log-2020-07-02.log
    |   |-- application.log.-2020-07-03.log
    |-- public
    |   |-- style.css
    |-- src
        |-- app.ts
        |-- global.d.ts
        |-- controllers
        |   |-- userController.ts
        |-- middlewares
        |   |-- logger.ts
        |   |-- response.ts
        |   |-- validator.ts
        |-- models
        |   |-- connection.ts
        |   |-- index.ts
        |   |-- user.ts
        |-- routes
        |   |-- index.ts
        |-- rules
        |   |-- login.ts
        |-- services
        |   |-- userService.ts
        |-- types
        |   |-- index.ts
        |-- utils
            |-- helper.ts
            |-- log4.ts
```

#### app.ts

```javascript
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
app.use(koaStatic(path.resolve(__dirname, '../public')));

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

```