import express from 'express';
import BookingController from '../controllers/booking.controller';

const bookingRouter = express.Router();
const bookingController = new BookingController();

// Create a new booking
bookingRouter.post('/', bookingController.createBooking);
bookingRouter.get('/', bookingController.getBookings);
bookingRouter.get('/:id', bookingController.getBookingById);
bookingRouter.patch('/:id', bookingController.updateBooking);
bookingRouter.delete('/:id', bookingController.deleteBooking);

export default bookingRouter;


