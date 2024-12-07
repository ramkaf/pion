import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const dbUri = process.env.MONGO_URI || 'mongodb://localhost:27017/pion';
    await mongoose.connect(dbUri); // No need for `useNewUrlParser` and `useUnifiedTopology`
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1);
  }
};

export default connectDB;
