import { Response, Request, NextFunction } from 'express';
import BeanModel  from '../models/BeanModel';
import Bean from '../interfaces/Bean';
import validateBean from '../validation/beanvalidation';
import moment from 'moment';

const AddBean = async (req: Request, res: Response, next: NextFunction) => {
    //We first need to make sure the user is logged in to create a Bean
    const bean: Bean = req.body;

    // Make sure the data is there before ssving
    const { errors, isValid } = validateBean(bean)

    if(!isValid) {
    return res.status(400).json({errors});
    }
    
   
    // This is a bit hacky as with typescript it is tricky to append something to the request so just set the type as any
    const req_user: any = req.user;
  
    // Create the new bean 
    const newBean = await BeanModel.create({
        ...bean,
        author: req_user._id
    });

    // return the bean
    res.status(200).json(newBean);

};

export default AddBean;