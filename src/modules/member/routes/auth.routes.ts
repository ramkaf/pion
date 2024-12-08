import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import isAuthenticated from '../middlewares/passport-jwt';

const authController = new AuthController();
const authRouter = Router();

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.post('/logout', isAuthenticated, authController.logout);

export default authRouter;

