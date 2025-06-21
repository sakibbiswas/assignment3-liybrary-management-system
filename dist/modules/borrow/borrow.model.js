"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const borrowSchemaFields = {
    book: {
        type: mongoose_1.Types.ObjectId,
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
const borrowSchema = new mongoose_1.Schema(borrowSchemaFields, {
    timestamps: true,
});
const Borrow = (0, mongoose_1.model)('Borrow', borrowSchema);
exports.default = Borrow;
