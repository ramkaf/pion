import { ForbiddenError } from "../../../../common/errors/AppError";
import { ResponseHandler } from "../../../../common/utils/ResponseHandler";
import { NextFunction, Request, Response } from "express";

export const authorizeUserOrAdmin = (arg:string , reqObj: "body" | "query" | "params") => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Check if the user is an admin
    if (req.user?.role === "admin")
      return next(); 

    const userId = req.user?._id.toString();
    const requestedId = req[reqObj][arg] || req[reqObj][arg]|| req[reqObj][arg];

    if (userId === requestedId) return next();
    return ResponseHandler.error(
      res,
      "'Forbidden: You do not have permission to access this resource.'",
      new ForbiddenError(),
      403,
    );
  };
};
