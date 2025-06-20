import { Schema, model, Document } from 'mongoose';
import { IBook } from './book.interface';

interface IBookDocument extends IBook, Document {
  updateAvailability(): void;
}

const bookSchema = new Schema<IBookDocument>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: {
      type: Number,
      required: true,
      min: [0, 'Copies must be a positive number'],
    },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

//  Instance method: updateAvailability
bookSchema.methods.updateAvailability = function () {
  this.available = this.copies > 0;
};

// Mongoose Middleware: update availability before saving
bookSchema.pre('save', function (next) {
  this.updateAvailability();
  next();
});

const Book = model<IBookDocument>('Book', bookSchema);
export default Book;
