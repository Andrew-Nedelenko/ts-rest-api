import { Request, Response } from 'express';

export const userProfile = async (req: Request, res: Response): Promise<void> => {
  res.send(req.locals);
};
