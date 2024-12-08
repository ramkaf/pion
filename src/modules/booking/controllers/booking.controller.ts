import { Request, Response } from 'express';
import { ResponseHandler } from '../../../../common/utils/ResponseHandler'; // Adjust path as necessary
import BookingService from '../services/booking.service'; // Adjust path as necessary

class BookingController {
  private bookingService: BookingService;

  constructor() {
    this.bookingService = new BookingService();
    this.create = this.create.bind(this);
    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  // Create a new booking
  async create(req: Request, res: Response): Promise<void> {
    try {
      const {_id:member} = req.user!
      const booking = await this.bookingService.create({ ...req.body , member });
      return ResponseHandler.success(res, booking, 'Booking created successfully');
    } catch (error: any) {
      console.error(error);
      return ResponseHandler.error(res, 'Error in createBooking controller', error);
    }
  }

  // Get booking(s) by ID or all bookings
  async get(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const booking = id
        ? await this.bookingService.get(id)
        : await this.bookingService.get();
      return ResponseHandler.success(res, booking);
    } catch (error: any) {
      console.error(error);
      return ResponseHandler.error(res, 'Error in getBooking controller', error);
    }
  }

  // Update booking by ID
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id, ...rest } = req.body;
      const booking = await this.bookingService.update(id, rest);
      return ResponseHandler.success(res, booking, 'Booking updated successfully');
    } catch (error: any) {
      console.error(error);
      return ResponseHandler.error(res, 'Error in updateBooking controller', error);
    }
  }

  // Delete booking by ID
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const booking = await this.bookingService.delete(id);
      return ResponseHandler.success(res, booking, 'Booking deleted successfully');
    } catch (error: any) {
      console.error(error);
      return ResponseHandler.error(res, 'Error in deleteBooking controller', error);
    }
  }
}

export default BookingController;
