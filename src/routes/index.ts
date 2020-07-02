import Router from 'koa-router';
import Validator from '../middlewares/validator';
import { EResponseCode } from '../types';

const router = new Router();

router.get('/', Validator.validLogin, async (ctx, next) => {
  ctx.body = {
    code: EResponseCode.SUCCESS,
    data: {}
  };
  next();
});

export default router;
