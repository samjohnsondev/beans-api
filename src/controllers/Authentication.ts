import { Request, Response, NextFunction } from 'express';
import User from '../interfaces/User';
import { Token, TokenData } from '../interfaces/Token';
import UserModel from '../models/User';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../credentials';
import validateUser from '../validation/userValidation';


export const RegisterUser = async (req: Request, res: Response) => {
    const userData: User = req.body;

    const { errors, isValid } = validateUser(userData);

    // Make sure the data is valid
    if(!isValid) {
        res.status(404).json(errors);
    }

    // Check to see if a user exists with that email
    if(await UserModel.findOne({ email: userData.email})){
        res.status(400).json({ error: 'Email exists'})
    } else {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await UserModel.create({
            ...userData,
            password: hashedPassword
        });

        // Create the jwt
        const tokenData: Token = createJsonToken(user);
        
        //Return the data for the client
        res.status(200).json({ user, token: tokenData.token});
    }
}

export const Login = async (req: Request, res: Response) => {
    const userData: User = req.body;

    const { errors, isValid } = validateUser(userData);

    if(!isValid) {
        res.status(404).json(errors);
    }

    const user = await UserModel.findOne({ email: userData.email});

    if(user){
        const passwordCheck = await bcrypt.compare(userData.password, user.password);
        
        if(passwordCheck) {
            const tokenData: Token = createJsonToken(user);

           return res.status(200).json({ user, token: tokenData.token });
        } else { 
           return res.status(403).json({ error: 'Login details incorrect' });
        }
    } else {
        return res.status(403).json({ error: 'User not found' });
    }
}

const createJsonToken = (user: User) => {
    //Set the length of the token
    const tokenLength = 60 * 60;
    //Setup the token to the user id
    const tokenData: TokenData = {
        _id: user._id
    };

    return {
        expiresIn: tokenLength,
        token: jwt.sign(tokenData, JWT_SECRET, { expiresIn: tokenLength })
    }
};
