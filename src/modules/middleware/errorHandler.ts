import { ErrorRequestHandler } from 'express';

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const errorResponse = {
    success: false,
    message: 'Something went wrong',
    error: err,
  };

  if (err.name === 'ValidationError') {
    errorResponse.message = 'Validation failed';
  } else if (err.message) {
    errorResponse.message = err.message;
  }

  res.status(400).json(errorResponse);
};