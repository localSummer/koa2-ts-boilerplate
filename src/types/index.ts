import log4js from 'log4js';
import { TSuccess, TError } from '../middlewares/response';

// 为 Context 类型扩展自定义属性
declare module 'koa' {
  interface DefaultState {
    stateProperty: boolean;
  }

  interface DefaultContext {
    success: TSuccess;
    error: TError;
    logger: log4js.Logger;
  }
}

export enum EResponseFlag {
  ERROR,
  SUCCESS
}

export enum EResponseStatus {
  SUCCESS = 200,
  ERROR = 500
}

export enum EErrorResponseMsg {
  INVALID_PARAMS = '参数不正确',
  DEFAULT_ERROR = ''
}

export enum EErrorResponseCode {
  DEFAULT_ERROR_CODE = 10000,
  INVALID_PARAMS_CODE = 10001
}
