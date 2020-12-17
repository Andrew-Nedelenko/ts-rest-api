
import { Request, Response } from 'express';
import db from '../../models/Database';


export const userJWTProfile = async (req: Request, res: Response): Promise<void> => {
  const userData = await db.promiseQuery(`
  SELECT * FROM userAuth WHERE id = ?
  `,
  [req.locals.id]);
  res.send(userData);
};
