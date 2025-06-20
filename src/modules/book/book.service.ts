import Book from './book.model';
import { IBook } from './book.interface';
import { FilterQuery, SortOrder } from 'mongoose';

//  Create a new book
export const createBook = async (payload: IBook): Promise<IBook> => {
  const book = new Book(payload);
  await book.save();
  return book;
};

//  Get all books with optional filtering, sorting, and limit
export const getAllBooks = async (
  filter: string = '',
  sortBy: string = 'createdAt',
  sort: SortOrder = 'asc',
  limit: number = 10
): Promise<IBook[]> => {
  const query: FilterQuery<IBook> = filter ? { genre: filter } : {};
  const sortObj = sortBy ? { [sortBy]: sort } : {};
  const books = await Book.find(query).sort(sortObj).limit(limit);
  return books;
};

//  Get a single book by its ID
export const getBookById = async (id: string): Promise<IBook | null> => {
  return await Book.findById(id);
};

//  Update a book by ID
export const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const updatedBook = await Book.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return updatedBook;
};

//  Delete a book by ID
export const deleteBook = async (id: string): Promise<null> => {
  await Book.findByIdAndDelete(id);
  return null;
};


