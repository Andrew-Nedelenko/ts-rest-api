import { Request, Response } from 'express';

export const userProfile = async (req: Request, res: Response) => {
  res.send('user profile');
};
