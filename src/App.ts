import { MONGO_PASSWORD, MONGO_USER } from './credentials';
import express, {Request, Response, NextFunction} from 'express';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from './controllers/router';
import passport from 'passport';

class BeansApp {
    public app: express.Application;

    constructor(){
        this.app = express();

        this.setupMiddleware();
        this.setupRoutes();
        this.connectToDatabase();
    }

    //method to set up any middleware for the api
    private setupMiddleware(){
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(passport.initialize())
    }

    //All the logic for the routes goes through here
    private setupRoutes(){
        this.app.use('/', router);
    }

    private connectToDatabase() {
          //Connect to the database
          mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@ds257648.mlab.com:57648/beanoftheday`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
              console.log('connected');
          }).catch((err) => {
              console.log(err);
          });
    }

}

export default new BeansApp().app