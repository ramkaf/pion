// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

// 404 Handler for unmatched routes
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
};

// General Error Handler
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log the error stack for debugging (use logging system in production)
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message || 'Internal server error',
  });
};
