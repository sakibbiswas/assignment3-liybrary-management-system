import { z } from 'zod';
export const borrowValidationSchema = z.object({
  book: z.string({ required_error: 'Book ID is required' }),
  quantity: z
    .number({ required_error: 'Quantity is required' })
    .int()
    .positive('Quantity must be a positive number'),
  dueDate: z
    .string({ required_error: 'Due date is required' })
    .refine(date => !isNaN(Date.parse(date)), {
      message: 'Invalid date format',
    }),
});
