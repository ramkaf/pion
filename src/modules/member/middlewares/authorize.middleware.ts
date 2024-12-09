import { ForbiddenError } from "common/errors/AppError";
import { ResponseHandler } from "common/utils/ResponseHandler";
import { NextFunction, Request, Response } from "express";

export const authorizeUserOrAdmin = (reqObj: 'body' | 'query' | 'params') => {
    return (req: Request, res: Response, next: NextFunction) => {
      // Check if the user is an admin
      if (req.user?.role === 'admin') {
        return next(); // Admins can access any resource
      }
  
      // Otherwise, check if the user is trying to access their own resource
      const userId = req.user?._id.toString();
      const requestedId = req[reqObj]._id || req[reqObj]._id || req[reqObj]._id;
  
      if (userId === requestedId) 
        return next();
      return ResponseHandler.error(res,"'Forbidden: You do not have permission to access this resource.'",new ForbiddenError(),403)
    };
  };