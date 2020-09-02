import { Request, Response } from 'express';
import BeanModel from '../models/BeanModel';
import moment from 'moment';

export const GetBeanByUser = async (req: Request, res: Response) => {
    // Get the user from the request
    const user: any = req.user;

    // Find all the beans for the user
    await BeanModel.find({ author: user._id}).sort({'displayDate': -1}).then(data => {
        res.status(200).json({ posts: data});
    }).catch(err => res.status(404).json({ err}))
};

export const GetBeanOfTheDay = async (req: Request, res: Response) => {
    // Find out todays date and format it nicely
    const todaysDate = moment(new Date().toISOString()).format('YYYY-MM-DD')
    
    await BeanModel.findOne({ displayDate: todaysDate}).then(post => {
        if(!post) {
            return res.status(200).json({ error: 'Whoops no beans today try again tomorrow!'})
        } else {
           return res.status(200).json({ post});
        }
    });
};