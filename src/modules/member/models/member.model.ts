import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs'

export enum Role {
  User = 'user',
  Admin = 'admin',
}

interface IMember extends Document {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    birthday: Date;
    phonenumber: string;
    role: Role;
    comparePassword(candidatePassword: string): Promise<boolean>;
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
    role: {
      type: String,
      enum: Object.values(Role), // Use the enum values
      default: Role.User, // Default to 'user'
      required: true,
    }
    
}, { timestamps: true });

memberSchema.pre<IMember>('save', async function(next) {
    if (!this.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;
      this.role = Role.User
      next();
    } catch (error: any) {
      return next(error);
    }
  });
  
  // Method to compare passwords
  memberSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  };
  
 const Member = mongoose.model<IMember>('Member', memberSchema);

 export  {Member , IMember}

