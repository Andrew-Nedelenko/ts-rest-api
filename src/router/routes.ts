import { Router } from 'express';
import { json } from 'body-parser';
import { accessControl } from '../middleware/check-credentials';
import { createUserValidation } from '../middleware/user-create-validation';
import { createuser } from '../controllers/user/user-create';
import { findUser } from '../controllers/admin/user-find';
import { userAuth } from '../middleware/user-auth';
import { userProfile } from '../controllers/user/user-profile';

import { addCredentials } from '../controllers/admin/add-credentaials';

export const router = Router();

/* user routes */
router.post('/user/create', json(), createUserValidation, createuser);
router.post('/user/auth', json(), userAuth, userProfile);
router.post('/user/profile', json(), userProfile);

/* admin routes */
router.get('/user/:id', accessControl, findUser);
router.post('/credentials/add', accessControl, json(), addCredentials);
