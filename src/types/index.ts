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

export enum EResponseCode {
  ERROR,
  SUCCESS
}

export enum EResponseStatus {
  SUCCESS = 200,
  ERROR = 500
}

export enum EResponseMsg {
  INVALID_PARAMS = '参数不正确',
  DEFAULT_ERROR = ''
}
