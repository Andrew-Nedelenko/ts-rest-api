import { Request, Response } from 'express';
import { promiseQuery } from '../models/mysql-promisify';

export const createuser = async (req: Request, res: Response): Promise<void> => {
  const {
    username, email, password, phone,
  } = req.body;
  try {
    const data = await promiseQuery(`INSERT INTO \`userAuth\` (username, email, password, phone) VALUES ('${username}', '${email}', '${password}', '${phone}' );`);
    res.status(201).send(data);
  } catch (e) {
    res.status(400).send('Error in database');
  }
};
