import express, { Express } from 'express';
import connectDB from '../config/db';
import passport from 'passport';
import memberRouter from './modules/member/routes/member.routes';
import authRouter from './modules/member/routes/auth.routes';
import courseRouter from './modules/course/routes/course.routes';
import bookingRouter from './modules/booking/routes/booking.routes'; // Assuming the booking router is created
import Database from './config/database';
import { errorHandler, notFoundHandler } from '../common/middleware/errorMiddleware'; // Updated to use correct error middleware
import adminRouter from './modules/admin/routes/admin.routes';

class App {
  public app: Express;
  private database: Database;

  constructor() {
    this.app = express();
    this.database = new Database(); 
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandlers();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
    this.database.connect();
    this.app.use(passport.initialize()); 
  }

  private setupRoutes(): void {
    
    this.app.use('/api/admin' , adminRouter)
    this.app.use('/api/auth', authRouter);
    this.app.use('/api/members', memberRouter);
    this.app.use('/api/courses', courseRouter);
    this.app.use('/api/bookings', bookingRouter);
  }

  private setupErrorHandlers(): void {
    this.app.use(notFoundHandler); // 404 error handler
    this.app.use(errorHandler);    // Global error handler
  }

  public start(): void {
    const port = process.env.PORT || 5000; // Use 5000 as default port if PORT is not set in .env
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}

export default App;


