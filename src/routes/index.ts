import Router from 'koa-router';
import Validator from '../middlewares/validator';
import UserController from '../controllers/userController';
import upload from '../middlewares/upload';

const router = new Router();

router.get('/', Validator.validLogin, UserController.login);

router.post('/upload', upload().single('file'), UserController.uploadAvator);

export default router;
