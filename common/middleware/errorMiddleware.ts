import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError"; // Custom error class
import { ResponseHandler } from "../utils/ResponseHandler"; // Response handler

// Not found handler
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(new AppError("Not Found", 404)); 
};

// Global error handler
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return err.sendError(res); 
  }
  console.error(err);
  return ResponseHandler.error(res, "Something went wrong", 500);
};
