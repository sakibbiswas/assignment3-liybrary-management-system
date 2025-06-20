import { Request, Response, NextFunction } from 'express';
import * as bookService from './book.service';
import sendResponse from '../utils/sendResponse';
import { bookValidationSchema } from './book.zod';
import { SortOrder } from 'mongoose';

//  Create Book with Zod Validation
export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = bookValidationSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: parsed.error,
      });
    }

    const result = await bookService.createBook(parsed.data);
    sendResponse(res, {
      success: true,
      message: 'Book created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//  Get All Books with Filtering, Sorting, and Limit
export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;

    const sortValue: SortOrder =
      sort === 'asc' || sort === 'desc' || sort === '1' || sort === '-1'
        ? (sort as SortOrder)
        : 'asc';

    const books = await bookService.getAllBooks(
      String(filter || ''),
      String(sortBy),
      sortValue,
      parseInt(String(limit))
    );

    sendResponse(res, {
      success: true,
      message: 'Books retrieved successfully',
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

//  Get Book By ID
export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await bookService.getBookById(req.params.bookId);
    sendResponse(res, {
      success: true,
      message: 'Book retrieved successfully',
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

//  Update Book
export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await bookService.updateBook(req.params.bookId, req.body);
    sendResponse(res, {
      success: true,
      message: 'Book updated successfully',
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

//  Delete Book
export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await bookService.deleteBook(req.params.bookId);
    sendResponse(res, {
      success: true,
      message: 'Book deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

