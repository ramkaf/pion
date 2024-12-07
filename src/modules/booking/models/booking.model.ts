import mongoose, { Schema, Document } from 'mongoose';

interface IBooking extends Document {
  memberId: mongoose.Types.ObjectId;
  classId: mongoose.Types.ObjectId;
  date: Date;
}

const bookingSchema = new Schema<IBooking>({
  memberId: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
  classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  date: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.model<IBooking>('Booking', bookingSchema);
