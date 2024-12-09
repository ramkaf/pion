import { Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../../../../common/utils/ResponseHandler"; // Adjust path as necessary
import BookingService from "../services/booking.service"; // Adjust path as necessary
import { Booking, IBooking } from "../models/booking.model"; // Adjust path as necessary

class BookingController {
  private bookingService: BookingService;

  constructor() {
    this.bookingService = new BookingService();
  }

  // Utility method to handle booking actions
  private async handleAction(
    action: () => Promise<any>,
    successMessage: string,
    errorMessage: string,
    res: Response
  ) {
    try {
      const result = await action();
      return ResponseHandler.success(res, result, successMessage);
    } catch (error) {
      console.error(error);
      return ResponseHandler.error(res, errorMessage, error);
    }
  }

  // Create a new booking
  create = async (req: Request, res: Response): Promise<void> => {
    const { _id: member } = req.user!;
    this.handleAction(
      () => this.bookingService.create({ ...req.body, member }),
      "Booking created successfully",
      "Error in createBooking controller",
      res
    );
  };

  // Get all bookings with member and course details
  getAllBookings = async (req: Request, res: Response): Promise<void> => {
    try {
      const bookings = await this.bookingService.getAll();
      return ResponseHandler.success(
        res,
        bookings,
        "Bookings retrieved successfully"
      );
    } catch (error) {
      console.error(error);
      return ResponseHandler.error(res, "Error fetching bookings", error);
    }
  };

  // Update booking by ID
  update = async (req: Request, res: Response): Promise<void> => {
    const { id, ...rest } = req.body;
    this.handleAction(
      () => this.bookingService.update(id, rest),
      "Booking updated successfully",
      "Error in updateBooking controller",
      res
    );
  };

  // Delete booking by ID
  delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { _id: member } = req.user!;
    this.handleAction(
      () => this.bookingService.delete(id, member.toString()),
      "Booking deleted successfully",
      "Error in deleteBooking controller",
      res
    );
  };
}

export default BookingController;
