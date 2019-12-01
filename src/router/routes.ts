import { Router, Request, Response } from 'express';

export const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ hello: '1' });
});

router.get('/userid/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ id });
});
