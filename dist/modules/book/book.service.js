"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = __importDefault(require("./book.model"));
//  Create a new book
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const book = new book_model_1.default(payload);
    yield book.save();
    return book;
});
exports.createBook = createBook;
//  Get all books with optional filtering, sorting, and limit
const getAllBooks = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (filter = '', sortBy = 'createdAt', sort = 'asc', limit = 10) {
    const query = filter ? { genre: filter } : {};
    const sortObj = sortBy ? { [sortBy]: sort } : {};
    const books = yield book_model_1.default.find(query).sort(sortObj).limit(limit);
    return books;
});
exports.getAllBooks = getAllBooks;
//  Get a single book by its ID
const getBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield book_model_1.default.findById(id);
});
exports.getBookById = getBookById;
//  Update a book by ID
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBook = yield book_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return updatedBook;
});
exports.updateBook = updateBook;
//  Delete a book by ID
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield book_model_1.default.findByIdAndDelete(id);
    return null;
});
exports.deleteBook = deleteBook;
