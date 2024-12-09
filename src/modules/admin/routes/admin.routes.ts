import { Router } from 'express';
import { isAuthenticated } from '../../member/middlewares/isAuthenticated.middleware';
import isAdmin from '../../member/middlewares/isAdmin.middleware';
import AdminController from '../controllers/admin.controller';
import {validator} from '../../../../common/middleware/validator'
import {mongoIdSchema} from '../../../../common/validations/mongodb-id.validation'
import { memberRegisterschema } from '../../../../src/modules/member/validation/register.schema';
import { memberUpdateschema } from '../../../../src/modules/member/validation/update.schema';

const adminRouter = Router();
const adminController = new AdminController ()
adminRouter.use(isAuthenticated , isAdmin); 

adminRouter.get('/courses/all', adminController.getAllCourseWithTheirMembers);
adminRouter.get('/members/all', adminController.getAllMembersWithTheirCourses);
adminRouter.get('/members/get/:id', validator(mongoIdSchema , "params"),adminController.getAllMembersWithTheirCourses);
adminRouter.post('/members',validator(memberRegisterschema , "body"), adminController.createMember);
adminRouter.put('/members',validator(memberUpdateschema , "body") , adminController.updateMember);
adminRouter.patch('/members/upgrade/:id',validator(mongoIdSchema , "params"), adminController.upgradeMember);
adminRouter.delete('/members/:id', validator(mongoIdSchema , "params"),adminController.removeMember);

export default adminRouter;
