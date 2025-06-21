"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const globalErrorHandler = (err, req, res, next) => {
    const errorResponse = {
        success: false,
        message: 'Something went wrong',
        error: err,
    };
    if (err.name === 'ValidationError') {
        errorResponse.message = 'Validation failed';
    }
    else if (err.message) {
        errorResponse.message = err.message;
    }
    res.status(400).json(errorResponse);
};
exports.globalErrorHandler = globalErrorHandler;
