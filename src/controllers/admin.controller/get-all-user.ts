import { Request, Response } from 'express';
import db from '../../models/Database';

export const getAllUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await db.promiseQuery('SELECT * FROM userAuth', []);
    res.json(data);
  } catch (e) {
    res.status(400).send(e);
  }
};
