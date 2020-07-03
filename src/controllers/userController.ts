import * as Koa from 'koa';
import UserService from '../services/userService';

class UserController {
  static async login(ctx: Koa.Context) {
    const user = await UserService.findUserById(1);
    ctx.success(user);
  }
}

export default UserController;
