"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_controller_1 = __importDefault(require("../controllers/booking.controller"));
const bookingRouter = express_1.default.Router();
const bookingController = new booking_controller_1.default();
// Create a new booking
bookingRouter.post('/', bookingController.createBooking);
bookingRouter.get('/', bookingController.getBookings);
bookingRouter.get('/:id', bookingController.getBookingById);
bookingRouter.patch('/:id', bookingController.updateBooking);
bookingRouter.delete('/:id', bookingController.deleteBooking);
exports.default = bookingRouter;
