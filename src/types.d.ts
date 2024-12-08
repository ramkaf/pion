import mongoose from 'mongoose';
import { IPayload } from './features/user/interfaces/payload.interface'
declare global {
  namespace Express {
    interface User {
        _id: mongoose.Types.ObjectId;
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        birthday: Date;
        phonenumber: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        __v: number;
      }
  }
}