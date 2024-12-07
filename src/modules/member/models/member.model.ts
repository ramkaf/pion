import mongoose, { Schema, Document } from 'mongoose';

interface IMember extends Document {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    birthday: Date;
    phonenumber: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const memberSchema = new Schema<IMember>({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthday: { type: Date, required: true },
    phonenumber: { type: String, required: true },
}, { timestamps: true });
 const Member = mongoose.model<IMember>('Member', memberSchema);

 export  {Member , IMember}