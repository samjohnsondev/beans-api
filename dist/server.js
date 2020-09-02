"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./App"));
// Setup the app to run the api
App_1.default.listen('5000', () => {
    console.log('Listening on port 5000...');
});
