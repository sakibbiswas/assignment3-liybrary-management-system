
import express from 'express';
import cors from 'cors';

import bookRoutes from './modules/book/book.route';
import borrowRoutes from './modules/borrow/borrow.route';
import { globalErrorHandler } from './modules/middleware/errorHandler';

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.send('📚 Library Management API is running!');
});

// Route registration
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes); 

// Global error handler
app.use(globalErrorHandler);

export default app;









