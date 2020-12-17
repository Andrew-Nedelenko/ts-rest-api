import { Router } from 'express';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import { getToken } from '../controllers/basic.auth.controller/get-token';
import { createUserValidation } from '../middleware/user-create-validation';
import { createuser } from '../controllers/user.controller/user-create';
import { userAuth } from '../middleware/user-auth';
import { userLogin } from '../controllers/user.controller/user-login';
import { checkAuth } from '../middleware/check-auth';
import { userProfile } from '../controllers/user.controller/user-profile';
import { userJWTProfile } from '../controllers/basic.auth.controller/userJWTprofile';
import { jwtVefiry } from '../middleware/jwt-verify';

const router: Router = Router();

router.post('/create', json(), createUserValidation, createuser);
router.post('/login', json(), userAuth, userLogin);
router.get('/profile', cookieParser(), checkAuth, userProfile);

router.post('/jwt/login', json(), userAuth, getToken);
router.post('/jwt/profile', json(), jwtVefiry, userJWTProfile);

export { router as userRouter };
