import { Request, Response } from 'express';
import { promiseQuery } from '../models/mysql-promisify';

export const findUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const query = await promiseQuery(`SELECT * FROM userAuth WHERE id = ${id};`);
  res.send(query);
};
