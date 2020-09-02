"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BeanModel_1 = __importDefault(require("../models/BeanModel"));
const moment_1 = __importDefault(require("moment"));
exports.GetBeanByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the user from the request
    const user = req.user;
    // Find all the beans for the user
    yield BeanModel_1.default.find({ author: user._id }).sort({ 'displayDate': -1 }).then(data => {
        res.status(200).json({ posts: data });
    }).catch(err => res.status(404).json({ err }));
});
exports.GetBeanOfTheDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Find out todays date and format it nicely
    const todaysDate = moment_1.default(new Date().toISOString()).format('YYYY-MM-DD');
    yield BeanModel_1.default.findOne({ displayDate: todaysDate }).then(post => {
        if (!post) {
            return res.status(200).json({ error: 'Whoops no beans today try again tomorrow!' });
        }
        else {
            return res.status(200).json({ post });
        }
    });
});
