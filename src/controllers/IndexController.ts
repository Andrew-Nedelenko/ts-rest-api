import { Request, Response } from 'express';

export const IndexController = (req: Request, res: Response): void => {
  res.json({ index: 'controller' });
};
