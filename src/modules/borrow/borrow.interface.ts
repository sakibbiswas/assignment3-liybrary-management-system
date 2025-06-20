// export interface IBorrow {
//   book: string;
//   quantity: number;
//   dueDate: Date;
// }


import { Types } from 'mongoose';

export interface IBorrow {
  book: Types.ObjectId;         
  quantity: number;
  dueDate: Date;
}
