
import Borrow from './borrow.model';
import Book from '../book/book.model';

export const createBorrow = async ({
  book,
  quantity,
  dueDate,
}: {
  book: string;
  quantity: number;
  dueDate: Date | string;
}) => {
  const foundBook = await Book.findById(book);
  if (!foundBook) throw new Error('Book not found');

  if (foundBook.copies < quantity) throw new Error('Not enough copies available');

  foundBook.copies -= quantity;
  foundBook.updateAvailability();
  await foundBook.save();

  const borrow = await Borrow.create({ book, quantity, dueDate });
  return borrow;
};

export const getBorrowSummary = async () => {
  return Borrow.aggregate([
    {
      $group: {
        _id: '$book',
        totalQuantity: { $sum: '$quantity' },
      },
    },
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: '_id',
        as: 'bookDetails',
      },
    },
    {
      $unwind: '$bookDetails',
    },
    {
      $project: {
        _id: 0,
        totalQuantity: 1,
        book: {
          title: '$bookDetails.title',
          isbn: '$bookDetails.isbn',
        },
      },
    },
  ]);
};

