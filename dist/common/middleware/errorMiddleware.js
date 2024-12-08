"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = void 0;
const AppError_1 = require("../errors/AppError"); // Custom error class
const ResponseHandler_1 = require("../utils/ResponseHandler"); // Response handler
// Not found handler
const notFoundHandler = (req, res, next) => {
    next(new AppError_1.AppError('Not Found', 404)); // Passes the error to the error handler
};
exports.notFoundHandler = notFoundHandler;
// Global error handler
const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError_1.AppError) {
        return err.sendError(res); // Handle specific errors using the sendError method
    }
    // Log the error and return a generic internal server error
    console.error(err);
    return ResponseHandler_1.ResponseHandler.error(res, 'Something went wrong', 500);
};
exports.errorHandler = errorHandler;
