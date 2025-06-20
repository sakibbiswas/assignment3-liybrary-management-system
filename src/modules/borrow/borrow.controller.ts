
import { Request, Response, NextFunction } from 'express';
import * as borrowService from './borrow.service';
import sendResponse from '../utils/sendResponse';
import { borrowValidationSchema } from './borrow.zod';

export const createBorrow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = borrowValidationSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: parsed.error,
      });
    }
    const result = await borrowService.createBorrow(parsed.data);
    sendResponse(res, {
      success: true,
      message: 'Book borrowed successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getBorrowSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await borrowService.getBorrowSummary();
    sendResponse(res, {
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};







