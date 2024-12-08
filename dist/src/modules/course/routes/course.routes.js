"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = __importDefault(require("../controllers/course.controller"));
const isAuthenticated_middleware_1 = require("../../member/middlewares/isAuthenticated.middleware");
const courseController = new course_controller_1.default();
const courseRouter = (0, express_1.Router)();
courseRouter.use(isAuthenticated_middleware_1.isAuthenticated);
courseRouter.post('/', courseController.createCourse);
courseRouter.get('/', courseController.getCourses);
courseRouter.get('/:id', courseController.getCourseById);
courseRouter.patch('/:id', courseController.updateCourse);
courseRouter.delete('/:id', courseController.deleteCourse);
exports.default = courseRouter;
