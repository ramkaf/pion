import mongoose from "mongoose";

class Database {
  private dbUri: string;

  constructor() {
    // Default DB URI or fallback to env variable
    this.dbUri = process.env.MONGO_URI || "mongodb://localhost:27017/pion";
  }

  // Connect to MongoDB
  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.dbUri);
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("Database connection failed", error);
      process.exit(1);
    }
  }

  // Optionally, you could add a disconnect method if needed
  public disconnect(): void {
    mongoose.disconnect();
  }
}

export default Database;
