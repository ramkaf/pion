import { Router } from 'express';
import {} from '../../member/middlewares/passport-jwt';
import CourseController from '../controllers/course.controller';
import { isAuthenticated } from '../../member/middlewares/isAuthenticated.middleware';
import { courseCreateSchema } from '../validation/create-course.schema';
import { validator } from '../../../../common/middleware/validator';
import { courseGetOneByIdSchema, courseGetOneSchema } from '../validation/get-course.schema';
import { courseUpdateSchema } from '../validation/update-course.schema';
import isAdmin from '../../member/middlewares/isAdmin.middleware';


const courseController = new CourseController();
const courseRouter = Router();
courseRouter.use(isAuthenticated , isAdmin)

courseRouter.post('/', validator(courseCreateSchema,'body') , courseController.createCourse);
courseRouter.get('/:id?', validator(courseGetOneSchema ,'params'),courseController.getCourse);
courseRouter.patch('/',validator(courseUpdateSchema , 'body'), courseController.updateCourse);
courseRouter.delete('/:id', validator(courseGetOneByIdSchema , 'params'), courseController.deleteCourse);

export default courseRouter;

