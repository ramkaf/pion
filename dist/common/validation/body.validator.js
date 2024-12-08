"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBodySchema = void 0;
const ResponseHandler_1 = require("../utils/ResponseHandler");
const functions_1 = require("../utils/functions");
const validateBodySchema = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            let errorMessages = (0, functions_1.formatJoiMessage)(error.details);
            return ResponseHandler_1.ResponseHandler.error(res, errorMessages, 403);
        }
        req.validatedBody = value;
        next();
    };
};
exports.validateBodySchema = validateBodySchema;
