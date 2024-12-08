import { Request, Response } from 'express';
import { Booking } from '../models/booking.model';

class BookingController {
  // Create a new Booking
  async createBooking(req: Request, res: Response): Promise<void> {
    try {
      const { user, class: classId } = req.body;

      // Ensure required fields are provided
      if (!user || !classId) {
        res.status(400).json({ message: 'User and class are required' });
        return;
      }

      // Create and save the new booking
      const newBooking = new Booking({ user, class: classId });
      await newBooking.save();

      res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error: any) {
      res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
  }

  // Get all Bookings
  async getBookings(req: Request, res: Response): Promise<void> {
    try {
      const bookings = await Booking.find().populate('user class');  // Populate user and class references
      res.json(bookings);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
  }

  // Get a single Booking by ID
  async getBookingById(req: Request, res: Response): Promise<void> {
    try {
      const booking = await Booking.findById(req.params.id).populate('user class');
      if (!booking) {
        res.status(404).json({ message: 'Booking not found' });
        return;
      }
      res.json(booking);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching booking', error: error.message });
    }
  }

  // Update Booking by ID
  async updateBooking(req: Request, res: Response): Promise<void> {
    try {
      const updatedBooking = await Booking.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // Return the updated document
      ).populate('user class');
      if (!updatedBooking) {
        res.status(404).json({ message: 'Booking not found' });
        return;
      }
      res.json({ message: 'Booking updated successfully', booking: updatedBooking });
    } catch (error: any) {
      res.status(500).json({ message: 'Error updating booking', error: error.message });
    }
  }

  // Delete Booking by ID
  async deleteBooking(req: Request, res: Response): Promise<void> {
    try {
      const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
      if (!deletedBooking) {
        res.status(404).json({ message: 'Booking not found' });
        return;
      }
      res.json({ message: 'Booking deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ message: 'Error deleting booking', error: error.message });
    }
  }
}

export default BookingController;


