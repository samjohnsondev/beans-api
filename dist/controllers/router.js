"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const AddBean_1 = __importDefault(require("../controllers/AddBean"));
const GetBeans_1 = require("./GetBeans");
const Authentication_1 = require("../controllers/Authentication");
const passport_1 = __importDefault(require("passport"));
require("../config/passport");
const router = express.Router();
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.get('/health', (req, res) => {
    res.status(200).json({ message: 'running' });
});
router.post('/addbean', passport_1.default.authenticate('jwt', { session: false }), AddBean_1.default);
router.get('/getbeans', passport_1.default.authenticate('jwt', { session: false }), GetBeans_1.GetBeanByUser);
router.get('/beanoftheday', GetBeans_1.GetBeanOfTheDay);
router.post('/auth/register', Authentication_1.RegisterUser);
router.post('/auth/login', Authentication_1.Login);
exports.default = router;
