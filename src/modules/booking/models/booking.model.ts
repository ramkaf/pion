import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId; // Reference to User
  class: mongoose.Types.ObjectId; // Reference to Class
}

const bookingSchema = new Schema<IBooking>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    class: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  },
  { timestamps: true }
);

export const Booking =  mongoose.model<IBooking>('Booking', bookingSchema);


