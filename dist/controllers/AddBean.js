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
const beanvalidation_1 = __importDefault(require("../validation/beanvalidation"));
const AddBean = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //We first need to make sure the user is logged in to create a Bean
    const bean = req.body;
    // Make sure the data is there before ssving
    const { errors, isValid } = beanvalidation_1.default(bean);
    if (!isValid) {
        return res.status(400).json({ errors });
    }
    // This is a bit hacky as with typescript it is tricky to append something to the request so just set the type as any
    const req_user = req.user;
    // Create the new bean 
    const newBean = yield BeanModel_1.default.create(Object.assign(Object.assign({}, bean), { author: req_user._id }));
    // return the bean
    res.status(200).json(newBean);
});
exports.default = AddBean;
