import { Request, Response } from 'express';
import argon from 'argon2';
import { promiseQuery } from '../../models/mysql-promisify';
import { CreateUserTypes } from '../../middleware/user-create-validation';

export const createuser = async (req: Request, res: Response): Promise<void> => {
  const {
    username, email, password, phone,
  }: CreateUserTypes = req.body;
  try {
    const hash = await argon.hash(password);
    const data = await promiseQuery('INSERT INTO userAuth (username, email, phone, password, ban) VALUES (?, ?, ?, ?, ?);',
      [username, email.toLowerCase(), phone, hash, 0]);
    res.status(201).send(data);
  } catch (e) {
    res.status(400).send('Error in database');
  }
};
