import { Router } from 'express';
import MemberController from '../controllers/member.controller';

// Instantiate the controller
const memberController = new MemberController();

const memberRouter = Router();

// Define routes and link them to controller methods
memberRouter.post('/', memberController.createMember); // Create a user
memberRouter.get('/', memberController.getMembers); // Get all users
memberRouter.get('/:id', memberController.getMemberById); // Get a user by ID
memberRouter.put('/:id', memberController.updateMember); // Update a user by ID
memberRouter.delete('/:id', memberController.deleteMember); // Delete a user by ID

export default memberRouter;
