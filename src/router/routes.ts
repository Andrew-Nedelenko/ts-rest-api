import { Router } from 'express';
import { json } from 'body-parser';
import { createuser } from '../controllers/user-create';
import { findUser } from '../controllers/user-find';

export const router = Router();

router.post('/user/create', json(), createuser);
router.get('/user/:id', findUser);
