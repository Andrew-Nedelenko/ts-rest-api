import { Request, Response } from 'express';
import argon from 'argon2';
import db from '../../models/Database';
import { CreateUserTypes } from '../../middleware/user-create-validation';

export const createuser = async (req: Request, res: Response): Promise<void> => {
  const {
    username, email, password, phone,
  }: CreateUserTypes = req.body;
  try {
    const hash = await argon.hash(password);
    await db.promiseQuery(
      `INSERT INTO 
        userAuth (username, email, phone, password, ban) 
        VALUES (?, ?, ?, ?, ?);`,
      [username, email.toLowerCase(), phone, hash, 0],
    );
    res.status(201).json({ msg: 'user created' });
  } catch (e) {
    res.status(400).json({ msg: 'Cannot create user', e });
  }
};
