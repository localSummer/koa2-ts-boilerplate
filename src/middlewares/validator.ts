import * as Koa from 'koa';
import loginModel from '../rules/login';
import * as Types from '../types';

class Validator {
  static async validLogin(ctx: Koa.Context, next: Koa.Next) {
    const result = loginModel.check({
      username: 'test',
      email: 'test@qq.com',
      age: 20
    });

    if (
      (Object.keys(result) as ['username', 'email', 'age']).filter((name) => result[name].hasError)
        .length > 0
    ) {
      ctx.body = {
        code: Types.EResponseCode.ERROR,
        msg: Types.EResponseMsg.INVALID_MSG
      };
    } else {
      next();
    }
  }
}

export default Validator;
