import * as Koa from 'koa';

class UserController {
  static async login(ctx: Koa.Context, next: Koa.Next) {
    ctx.success({
      username: 'test'
    });
    next();
  }
}

export default UserController;
