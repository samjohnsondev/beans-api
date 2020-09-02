"use strict";
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
const credentials_1 = require("./credentials");
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("./controllers/router"));
const passport_1 = __importDefault(require("passport"));
class BeansApp {
    constructor() {
        this.app = express_1.default();
        this.setupMiddleware();
        this.setupRoutes();
        this.connectToDatabase();
    }
    //method to set up any middleware for the api
    setupMiddleware() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookie_parser_1.default());
        this.app.use(passport_1.default.initialize());
    }
    //All the logic for the routes goes through here
    setupRoutes() {
        this.app.use('/', router_1.default);
    }
    connectToDatabase() {
        //Connect to the database
        mongoose_1.default.connect(`mongodb://${credentials_1.MONGO_USER}:${credentials_1.MONGO_PASSWORD}@ds257648.mlab.com:57648/beanoftheday`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            console.log('connected');
        }).catch((err) => {
            console.log(err);
        });
    }
}
exports.default = new BeansApp().app;
