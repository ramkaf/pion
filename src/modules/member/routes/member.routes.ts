import { Router } from 'express';
import MemberController from '../controllers/member.controller';
import { IMember } from '../models/member.model';
import isAdmin from '../middlewares/isAdmin.middleware';
import { isAuthenticated } from '../middlewares/isAuthenticated.middleware';

const memberController = new MemberController();
const memberRouter = Router();

memberRouter.use(isAuthenticated)

memberRouter.post('/', isAdmin,memberController.createMember); // Create a user
memberRouter.get('/', isAdmin,memberController.getMembers); // Get all users
memberRouter.get('/:id', isAdmin,memberController.getMemberById); // Get a user by ID
memberRouter.put('/:id', isAdmin,memberController.updateMember); // Update a user by ID
memberRouter.delete('/:id', isAdmin,memberController.deleteMember); 
memberRouter.get('/profile/my-profile', (req, res) => {
    const member = req.user!;
    res.json({
      id: member._id,
      firstname: member.firstname,
      lastname: member.lastname,
      email: member.email
    });
  });
export default memberRouter;


