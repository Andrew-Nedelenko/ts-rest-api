import { Router } from 'express';
import { getAllUser } from '../controllers/admin.controller/get-all-user';

const router = Router();

router.get('/allusers', getAllUser);

export { router as adminRouter };
