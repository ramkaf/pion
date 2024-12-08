"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHandler = void 0;
class ResponseHandler {
    static success(res, data, message = 'Request successful') {
        return res.status(200).json({
            status: 'success',
            message,
            data,
        });
    }
    static error(res, message, statusCode = 500) {
        return res.status(statusCode).json({
            status: 'error',
            message,
        });
    }
}
exports.ResponseHandler = ResponseHandler;
