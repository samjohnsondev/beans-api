"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
// Seup the schema for the user
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    id: String
});
const UserModel = mongoose.model('User', userSchema);
exports.default = UserModel;
