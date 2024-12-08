"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const member_controller_1 = __importDefault(require("../controllers/member.controller"));
const isAdmin_middleware_1 = __importDefault(require("../middlewares/isAdmin.middleware"));
const isAuthenticated_middleware_1 = require("../middlewares/isAuthenticated.middleware");
const memberController = new member_controller_1.default();
const memberRouter = (0, express_1.Router)();
memberRouter.use(isAuthenticated_middleware_1.isAuthenticated);
memberRouter.post('/', isAdmin_middleware_1.default, memberController.createMember); // Create a user
memberRouter.get('/', isAdmin_middleware_1.default, memberController.getMembers); // Get all users
memberRouter.get('/:id', isAdmin_middleware_1.default, memberController.getMemberById); // Get a user by ID
memberRouter.put('/:id', isAdmin_middleware_1.default, memberController.updateMember); // Update a user by ID
memberRouter.delete('/:id', isAdmin_middleware_1.default, memberController.deleteMember);
memberRouter.get('/profile/my-profile', (req, res) => {
    const member = req.user;
    res.json({
        id: member._id,
        firstname: member.firstname,
        lastname: member.lastname,
        email: member.email
    });
});
exports.default = memberRouter;
