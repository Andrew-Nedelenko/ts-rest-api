import { Request, Response } from 'express';

export const userAuth = (req: Request, res: Response) => {
  console.log(req.body);
  res.send(req.body);
};
