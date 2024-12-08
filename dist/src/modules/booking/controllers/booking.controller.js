"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const booking_model_1 = require("../models/booking.model");
class BookingController {
    // Create a new Booking
    createBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user, class: classId } = req.body;
                // Ensure required fields are provided
                if (!user || !classId) {
                    res.status(400).json({ message: 'User and class are required' });
                    return;
                }
                // Create and save the new booking
                const newBooking = new booking_model_1.Booking({ user, class: classId });
                yield newBooking.save();
                res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
            }
            catch (error) {
                res.status(500).json({ message: 'Error creating booking', error: error.message });
            }
        });
    }
    // Get all Bookings
    getBookings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookings = yield booking_model_1.Booking.find().populate('user class'); // Populate user and class references
                res.json(bookings);
            }
            catch (error) {
                res.status(500).json({ message: 'Error fetching bookings', error: error.message });
            }
        });
    }
    // Get a single Booking by ID
    getBookingById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const booking = yield booking_model_1.Booking.findById(req.params.id).populate('user class');
                if (!booking) {
                    res.status(404).json({ message: 'Booking not found' });
                    return;
                }
                res.json(booking);
            }
            catch (error) {
                res.status(500).json({ message: 'Error fetching booking', error: error.message });
            }
        });
    }
    // Update Booking by ID
    updateBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedBooking = yield booking_model_1.Booking.findByIdAndUpdate(req.params.id, req.body, { new: true } // Return the updated document
                ).populate('user class');
                if (!updatedBooking) {
                    res.status(404).json({ message: 'Booking not found' });
                    return;
                }
                res.json({ message: 'Booking updated successfully', booking: updatedBooking });
            }
            catch (error) {
                res.status(500).json({ message: 'Error updating booking', error: error.message });
            }
        });
    }
    // Delete Booking by ID
    deleteBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedBooking = yield booking_model_1.Booking.findByIdAndDelete(req.params.id);
                if (!deletedBooking) {
                    res.status(404).json({ message: 'Booking not found' });
                    return;
                }
                res.json({ message: 'Booking deleted successfully' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error deleting booking', error: error.message });
            }
        });
    }
}
exports.default = BookingController;
