import express from 'express';
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from './book.controller';

const router = express.Router();

router.post('/', createBook);
router.get('/', getAllBooks);
router.get('/:bookId', getBookById);
router.put('/:bookId', updateBook);
router.delete('/:bookId', deleteBook);

export default router;