import { Request, Response } from 'express';
import { promiseQuery } from '../models/mysql-promisify';
import { encryption } from '../utils/password-encrypt';

export const createuser = async (req: Request, res: Response): Promise<void> => {
  const {
    username, email, password, phone,
  } = req.body;
  const encryptPassword = encryption(password);
  try {
    // eslint-disable-next-line max-len
    const data = await promiseQuery('INSERT INTO userAuth (username, email, phone, password, salt) VALUES (?, ?, ?, ?, ?);', [username, email, phone, `${encryptPassword.salt}$${encryptPassword.hash}`, encryptPassword.salt]);
    res.status(201).send(data);
  } catch (e) {
    res.status(400).send('Error in database');
  }
};
