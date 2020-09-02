"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const credentials_1 = require("../credentials");
const passport_1 = __importDefault(require("passport"));
const User_1 = __importDefault(require("../models/User"));
const Stratergy = passport_jwt_1.default.Strategy;
const extractJWT = passport_jwt_1.default.ExtractJwt;
const options = {};
options.jwtFromRequest = extractJWT.fromAuthHeaderAsBearerToken();
options.secretOrKey = credentials_1.JWT_SECRET;
// Use the token id to find the user in the database
passport_1.default.use(new Stratergy(options, (jwtToken, done) => {
    User_1.default.findById(jwtToken._id)
        .then(user => {
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    });
}));
