"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Create the database schema
const beanSchema = new mongoose_1.default.Schema({
    name: String,
    colour: String,
    odor: String,
    imagePath: String,
    displayDate: Date,
    price: Number,
    author: {
        ref: 'User',
        type: mongoose_1.default.Schema.Types.ObjectId
    }
});
// Setup the document
const BeanModel = mongoose_1.default.model('Bean', beanSchema);
exports.default = BeanModel;
