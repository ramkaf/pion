import { Router } from 'express';
import MemberController from '../controllers/member.controller';
import { IMember } from '../models/member.model';
import isAdmin from '../middlewares/isAdmin.middleware';
import { isAuthenticated } from '../middlewares/isAuthenticated.middleware';

const memberController = new MemberController();
const memberRouter = Router();

memberRouter.use(isAuthenticated)

memberRouter.put('/:id',memberController.update); // Update a user by ID
memberRouter.delete('/:id',memberController.deleteMember); 
memberRouter.get('/profile', memberController.profile);

export default memberRouter;


