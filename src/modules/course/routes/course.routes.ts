import { Router } from 'express';
import isAuthenticated from '../../member/middlewares/passport-jwt';
import CourseController from '../controllers/course.controller';

const courseController = new CourseController();
const courseRouter = Router();
courseRouter.use(isAuthenticated)

courseRouter.post('/', courseController.createCourse);
courseRouter.get('/', courseController.getCourses);
courseRouter.get('/:id', courseController.getCourseById);
courseRouter.patch('/:id', courseController.updateCourse);
courseRouter.delete('/:id', courseController.deleteCourse);

export default courseRouter;