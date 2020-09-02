import passportJwt from 'passport-jwt';
import { JWT_SECRET } from '../credentials';
import passport from 'passport';
import UserModel from '../models/User';

const Stratergy = passportJwt.Strategy;
const extractJWT = passportJwt.ExtractJwt;

const options: any = {};
options.jwtFromRequest = extractJWT.fromAuthHeaderAsBearerToken();
options.secretOrKey = JWT_SECRET;

// Use the token id to find the user in the database
passport.use(new Stratergy(options, (jwtToken, done) => {
    UserModel.findById(jwtToken._id)
    .then(user => {
        if(user){
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
}))


