import { Request, Response } from 'express';

export const userLogin = async (req: Request, res: Response): Promise<void> => {
  res.send({
    email: req.body.email,
    id: req.locals[0].id,
    status: 200,
  });
};
