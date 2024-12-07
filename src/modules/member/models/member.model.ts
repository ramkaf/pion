import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs'

interface IMember extends Document {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    birthday: Date;
    phonenumber: string;
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
}, { timestamps: true });

memberSchema.pre<IMember>('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();
  
    try {
      // Generate a salt
      const salt = await bcrypt.genSalt(10);
      // Hash the password along with our new salt
      const hash = await bcrypt.hash(this.password, salt);
      // Override the cleartext password with the hashed one
      this.password = hash;
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