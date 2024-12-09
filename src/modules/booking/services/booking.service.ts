import BaseService from "../../base/base.service";
import { Booking, IBooking } from "../models/booking.model";

class BookingService extends BaseService<IBooking> {
  constructor() {
    super(Booking);
  }

  async get(id: string, member?: string): Promise<IBooking | null> {
    const query: any = { _id: id };
    if (member) query.member = member;
    return Booking.findOne(query).populate('member course');
  }

  async getAll(member?: string): Promise<IBooking[]> {
    const query: any = member ? { member } : {};
    return Booking.find(query).populate('member course');
  }

  async update(id: string, data: Partial<IBooking>, member?: string): Promise<IBooking | null> {
    const query: any = { _id: id };
    if (member) query.member = member;
    return Booking.findOneAndUpdate(query, data, { new: true });
  }

  async delete(id: string, member?: string): Promise<IBooking | null> {
    const query: any = { _id: id };
    if (member) query.member = member;
    return Booking.findOneAndDelete(query);
  }
}

export default BookingService;


