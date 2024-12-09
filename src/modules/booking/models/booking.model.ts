import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  _id: mongoose.Types.ObjectId;
  member: mongoose.Types.ObjectId; // Reference to User
  course: mongoose.Types.ObjectId; // Reference to Class
}

const bookingSchema = new Schema<IBooking>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    member: { type: Schema.Types.ObjectId, ref: "Member", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  },
  { timestamps: true ,
    toJSON: { virtuals: true }, // This is important for populating virtuals
    toObject: { virtuals: true } // This is important for populating virtuals
  },
);

export const Booking = mongoose.model<IBooking>("Booking", bookingSchema);
