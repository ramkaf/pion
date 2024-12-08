import { Router } from 'express';
import {} from '../../member/middlewares/passport-jwt';
import { isAuthenticated } from '../../member/middlewares/isAuthenticated.middleware';
import { validator } from '../../../../common/middleware/validator';
import isAdmin from '../../member/middlewares/isAdmin.middleware';
import BookingController from '../controllers/booking.controller';
import { createBookingSchema } from '../validation/create-booking.schema';
import { bookingGetOneByIdSchema, bookingGetOneSchema } from '../validation/get-booking.schema';
import { updateBookingSchema } from '../validation/update-booking.schema';


const bookingController = new BookingController();
const courseRouter = Router();
courseRouter.use(isAuthenticated , isAdmin)

courseRouter.post('/', validator(createBookingSchema,'body') , bookingController.create);
courseRouter.get('/:id?', validator(bookingGetOneSchema ,'params'),bookingController.get);
courseRouter.patch('/',validator(updateBookingSchema , 'body'), bookingController.update);
courseRouter.delete('/:id', validator(bookingGetOneByIdSchema , 'params'), bookingController.delete);

export default courseRouter;

