import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
  title: string;
  description: string;
  capacity: number;
}

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    capacity: { type: Number, required: true },
  },
  { timestamps: true ,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  },
);
courseSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'course',
  justOne: false, // If a member can have multiple bookings
});

export const Course = mongoose.model<ICourse>("Course", courseSchema);
