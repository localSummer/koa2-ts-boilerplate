/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Koa from 'koa';
import * as Types from '../types';

export type TSuccess = (data?: any, status?: Types.EResponseStatus) => void;
export type TError = (
  code: Types.EErrorResponseCode,
  msg?: Types.EErrorResponseMsg,
  data?: any,
  status?: Types.EResponseStatus
) => void;

const koaResponse = async (ctx: Koa.Context, next: Koa.Next) => {
  ctx.success = (data = null, status = Types.EResponseStatus.SUCCESS) => {
    ctx.status = status;
    ctx.body = {
      flag: Types.EResponseFlag.SUCCESS,
      data
    };
  };

  ctx.error = (
    code = Types.EErrorResponseCode.DEFAULT_ERROR_CODE,
    msg = Types.EErrorResponseMsg.DEFAULT_ERROR,
    data = null,
    status = Types.EResponseStatus.SUCCESS
  ) => {
    ctx.status = status;
    ctx.body = {
      code,
      msg,
      data,
      flag: Types.EResponseFlag.ERROR
    };
  };

  await next();
};

export default koaResponse;
