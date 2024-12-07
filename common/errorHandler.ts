import { Request, Response, NextFunction } from 'express';
import { AppError } from './errors/AppError';
import { ResponseHandler } from './utils/ResponseHandler';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Check if the error is an instance of AppError or any specific error class
  if (err instanceof AppError) {
    return err.sendError(res); // Use the sendError method from the AppError class
  }

  // Handle unexpected internal server errors
  console.error(err);  // Log the error stack for internal server errors
  return ResponseHandler.error(res, 'Something went wrong', 500);
};

export default errorHandler;
