import * as Koa from 'koa';
import UserService from '../services/userService';

class UserController {
  static async login(ctx: Koa.Context) {
    const user = await UserService.findUserById(1);
    ctx.success(user);
  }

  static async uploadAvator(ctx: Koa.Context) {
    ctx.logger.warn(ctx.file);
    ctx.logger.warn(ctx.request.body);
    ctx.success('上传成功');
  }
}

export default UserController;
