"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const book_route_1 = __importDefault(require("./modules/book/book.route"));
const borrow_route_1 = __importDefault(require("./modules/borrow/borrow.route"));
const errorHandler_1 = require("./modules/middleware/errorHandler");
const app = (0, express_1.default)();
// Middleware setup
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Root endpoint.
app.get('/', (req, res) => {
    res.send('📚 Library Management API is running!');
});
// Route registration
app.use('/api/books', book_route_1.default);
app.use('/api/borrow', borrow_route_1.default);
// Global error handler.
app.use(errorHandler_1.globalErrorHandler);
exports.default = app;
