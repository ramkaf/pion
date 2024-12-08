import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError'; // Custom error class
import { ResponseHandler } from '../utils/ResponseHandler'; // Response handler

// Not found handler
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new AppError('Not Found', 404)); // Passes the error to the error handler
};

// Global error handler
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return err.sendError(res); // Handle specific errors using the sendError method
  }

  // Log the error and return a generic internal server error
  console.error(err);
  return ResponseHandler.error(res, 'Something went wrong', 500);
};


