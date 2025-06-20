
import { Schema, model, Types } from 'mongoose';
import { IBorrow } from './borrow.interface';

const borrowSchemaFields: Record<keyof IBorrow, any> = {
  book: {
    type: Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  dueDate: {
    type: Date,
    required: true,
  },
};

const borrowSchema = new Schema<IBorrow>(borrowSchemaFields, {
  timestamps: true,
});

const Borrow = model<IBorrow>('Borrow', borrowSchema);
export default Borrow;