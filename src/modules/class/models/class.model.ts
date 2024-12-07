import mongoose, { Schema, Document } from 'mongoose';

interface IClass extends Document {
  title: string;
  description: string;
  capacity: number;
}

const classSchema = new Schema<IClass>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  capacity: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model<IClass>('Class', classSchema);
