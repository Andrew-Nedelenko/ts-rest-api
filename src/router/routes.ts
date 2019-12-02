import { Router } from 'express';
import bodyParser from 'body-parser';
import { createuser } from '../controllers/user-create';
import { findUser } from '../controllers/user-find';

export const router = Router();

router.post('/user/create', bodyParser.json(), createuser);
router.get('/user/:id', findUser);
