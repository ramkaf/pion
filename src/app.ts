import express from 'express';
import connectDB from '../config/db';
import memberRouter from './modules/member/routes/member.routes';
import passport from 'passport';
import authRouter from './modules/member/routes/auth.routes';


const app = express();

// Middleware
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/members', memberRouter);
// app.use('/api/classes', classRoutes);
// app.use('/api/bookings', bookingRoutes);

app.listen(process.env.PORT! , ()=>console.log(`running server on port ${process.env.PORT}`));
export default app;
