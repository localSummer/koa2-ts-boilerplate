import Router from 'koa-router';
import Validator from '../middlewares/validator';
import UserController from '../controllers/userController';

const router = new Router();

router.get('/', Validator.validLogin, UserController.login);

export default router;
