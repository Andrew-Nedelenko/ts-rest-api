import { Router } from 'express';
import { json } from 'body-parser';
import { createUserValidation } from '../middleware/user-create-validation';
import { createuser } from '../controllers/user-create';
import { findUser } from '../controllers/user-find';
import { userAuth } from '../middleware/user-auth';
import { userProfile } from '../controllers/user-profile';

export const router = Router();

router.post('/user/create', json(), createUserValidation, createuser);
router.post('/user/auth', json(), userAuth, userProfile);
router.post('/user/profile', json(), userProfile);
router.get('/user/:id', findUser);
