import { Router } from 'express';
import AdminController from '../controllers/admin.controller';
import { isAuthenticated } from '../../member/middlewares/isAuthenticated.middleware';
import isAdmin from '../../member/middlewares/isAdmin.middleware';

const adminController = new AdminController ();
const adminRouter = Router();

adminRouter.use(isAuthenticated , isAdmin)
adminRouter.get('/:id?', isAdmin,adminController.createMember); 
adminRouter.post('/', isAdmin,adminController.getMember); 
export default adminRouter;


