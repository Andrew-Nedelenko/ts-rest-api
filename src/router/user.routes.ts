import { Router } from 'express';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import { IndexController } from '../controllers/IndexController';
import { createUserValidation } from '../middleware/user-create-validation';
import { createuser } from '../controllers/user.controller/user-create';
import { userAuth } from '../middleware/user-auth';
import { userLogin } from '../controllers/user.controller/user-login';
import { checkAuth } from '../middleware/check-auth';
import { userProfile } from '../controllers/user.controller/user-profile';


const router: Router = Router();

router.get('/test', IndexController);
router.post('/create', json(), createUserValidation, createuser);
router.post('/login', json(), userAuth, userLogin);
router.get('/profile', cookieParser(), checkAuth, userProfile);


export { router as userRouter };
