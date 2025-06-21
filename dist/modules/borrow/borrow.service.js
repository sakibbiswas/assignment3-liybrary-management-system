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
exports.getBorrowSummary = exports.createBorrow = void 0;
const borrow_model_1 = __importDefault(require("./borrow.model"));
const book_model_1 = __importDefault(require("../book/book.model"));
const createBorrow = (_a) => __awaiter(void 0, [_a], void 0, function* ({ book, quantity, dueDate, }) {
    const foundBook = yield book_model_1.default.findById(book);
    if (!foundBook)
        throw new Error('Book not found');
    if (foundBook.copies < quantity)
        throw new Error('Not enough copies available');
    foundBook.copies -= quantity;
    foundBook.updateAvailability();
    yield foundBook.save();
    const borrow = yield borrow_model_1.default.create({ book, quantity, dueDate });
    return borrow;
});
exports.createBorrow = createBorrow;
const getBorrowSummary = () => __awaiter(void 0, void 0, void 0, function* () {
    return borrow_model_1.default.aggregate([
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
});
exports.getBorrowSummary = getBorrowSummary;
