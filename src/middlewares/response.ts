/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Koa from 'koa';
import * as Types from '../types';

export type TSuccess = (data?: any, status?: Types.EResponseStatus) => void;
export type TError = (msg?: Types.EResponseMsg, data?: any, status?: Types.EResponseStatus) => void;

const koaResponse = async (ctx: Koa.Context, next: Koa.Next) => {
  ctx.success = (data = null, status = Types.EResponseStatus.SUCCESS) => {
    ctx.status = status;
    ctx.body = {
      code: Types.EResponseCode.SUCCESS,
      data
    };
  };

  ctx.error = (
    msg = Types.EResponseMsg.DEFAULT_ERROR,
    data = null,
    status = Types.EResponseStatus.SUCCESS
  ) => {
    ctx.status = status;
    ctx.body = {
      code: Types.EResponseCode.ERROR,
      data,
      msg
    };
  };

  await next();
};

export default koaResponse;
