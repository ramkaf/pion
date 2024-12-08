import BaseService from "../../base/base.service";
import { Booking, IBooking } from "../models/booking.model";

class BookingService extends BaseService<IBooking> {
  constructor() {
    super(Booking);
  }
}

export default BookingService;


