### 技术栈
koa2 + typescript + sequelize + sequelize-cli + mysql + jest + log4js + pm2 + gulp

### 功能支持
1. typescript
2. sequelize orm
3. log4js 日志处理
4. @koa/multer 文件上传
5. schema-typed 请求参数校验
6. ctx 自定义属性（及类型）扩展，如 `ctx.success` `ctx.error` `ctx.logger` [koa2+ts中为Context扩展自定义属性](https://blog.csdn.net/roamingcode/article/details/107084933)
7. jest 测试

> 注意：所有自定义中间件在 `next` 调用时，需使用右侧格式 `await next()`，否则在 `controller` 中操作数据库会引发 `ctx.body` 数据丢失问题

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
  "compile": "tsc --project tsconfig.json -w",
  "dev": "cross-env NODE_ENV=development nodemon bin/www",
  "build": "tsc --project tsconfig.json",
  "prd": "cross-env NODE_ENV=production pm2 start bin/www",
  "clear": "rm -r dist",
  "eslint": "eslint src --ext .ts",
  "gulp-compile": "gulp dev",
  "gulp-build": "gulp build",
  "test": "jest --passWithNoTests --updateSnapshot",
  "test:watch": "jest --coverage --watch",
  "test:prod": "npm run eslint && npm run test -- --no-cache"
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
    |-- jest.config.js
    |-- package-lock.json
    |-- package.json
    |-- prettier.config.js
    |-- tsconfig.json
    |-- bin
    |   |-- www
    |-- config
    |   |-- constant.js
    |   |-- db.json
    |   |-- jest
    |       |-- cssTransform.js
    |       |-- fileTransform.js
    |-- coverage
    |-- db
    |   |-- migrations
    |   |   |-- 20200702123744-create-user.js
    |   |-- seeders
    |-- dist
    |-- logs
    |   |-- access.log.-2020-07-04.log
    |   |-- application.log.-2020-07-04.log
    |-- public
    |   |-- style.css
    |-- src
    |   |-- app.ts
    |   |-- global.d.ts
    |   |-- __test__
    |   |   |-- format.test.ts
    |   |-- controllers
    |   |   |-- userController.ts
    |   |-- middlewares
    |   |   |-- logger.ts
    |   |   |-- response.ts
    |   |   |-- upload.ts
    |   |   |-- validator.ts
    |   |-- models
    |   |   |-- connection.ts
    |   |   |-- index.ts
    |   |   |-- user.ts
    |   |-- routes
    |   |   |-- index.ts
    |   |-- rules
    |   |   |-- login.ts
    |   |-- services
    |   |   |-- userService.ts
    |   |-- types
    |   |   |-- index.ts
    |   |-- utils
    |       |-- helper.ts
    |       |-- log4.ts
    |-- uploads
        |-- 2020-07-04
            |-- 1593850667585.jpg
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

```