"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
require("../config/passport");
const authenticateJWT = (req, res, next) => {
    passport_1.default.authenticate('jwt', (err, user, info) => {
        if (err) {
            return res.status(403).json({ error: 'Not Allowed' });
        }
        if (!user) {
            return res.status(404).json({ errors: 'Not found' });
        }
        else {
            next();
        }
    })(req, res, next);
};
exports.default = authenticateJWT;
