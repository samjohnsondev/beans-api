import { Express, Request, Response, NextFunction } from 'express';
import * as express from 'express'
import AddBean from '../controllers/AddBean';
import { GetBeanByUser, GetBeanOfTheDay } from './GetBeans';
import { RegisterUser, Login } from '../controllers/Authentication';
import passport from 'passport';
import '../config/passport';

const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

router.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ message: 'running'});
})

router.post('/addbean', passport.authenticate('jwt', { session: false }), AddBean);
router.get('/getbeans', passport.authenticate('jwt', { session: false}), GetBeanByUser);
router.get('/beanoftheday', GetBeanOfTheDay);
router.post('/auth/register', RegisterUser);
router.post('/auth/login', Login);


export default router;