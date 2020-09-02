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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const credentials_1 = require("../credentials");
const userValidation_1 = __importDefault(require("../validation/userValidation"));
exports.RegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const { errors, isValid } = userValidation_1.default(userData);
    // Make sure the data is valid
    if (!isValid) {
        res.status(404).json(errors);
    }
    // Check to see if a user exists with that email
    if (yield User_1.default.findOne({ email: userData.email })) {
        res.status(400).json({ error: 'Email exists' });
    }
    else {
        const hashedPassword = yield bcrypt.hash(userData.password, 10);
        const user = yield User_1.default.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
        // Create the jwt
        const tokenData = createJsonToken(user);
        //Return the data for the client
        res.status(200).json({ user, token: tokenData.token });
    }
});
exports.Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const { errors, isValid } = userValidation_1.default(userData);
    if (!isValid) {
        res.status(404).json(errors);
    }
    const user = yield User_1.default.findOne({ email: userData.email });
    if (user) {
        const passwordCheck = yield bcrypt.compare(userData.password, user.password);
        if (passwordCheck) {
            const tokenData = createJsonToken(user);
            return res.status(200).json({ user, token: tokenData.token });
        }
        else {
            return res.status(403).json({ error: 'Login details incorrect' });
        }
    }
    else {
        return res.status(403).json({ error: 'User not found' });
    }
});
const createJsonToken = (user) => {
    //Set the length of the token
    const tokenLength = 60 * 60;
    //Setup the token to the user id
    const tokenData = {
        _id: user._id
    };
    return {
        expiresIn: tokenLength,
        token: jwt.sign(tokenData, credentials_1.JWT_SECRET, { expiresIn: tokenLength })
    };
};
