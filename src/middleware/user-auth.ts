import { Request, Response, NextFunction } from 'express';
import argon from 'argon2';
import { promiseQuery } from '../models/mysql-promisify';

export const userAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;
  try {
    const data: Array<{password: string; email: string}> = await promiseQuery('SELECT * FROM userAuth WHERE email = ?', [email]);
    if (data.length > 0) {
      const compare = await argon.verify(data[0].password, password);
      if (compare) {
        next();
      } else {
        res.status(401).send('wrong email or password');
      }
    } else {
      res.status(401).send('wrong email or password');
    }
  } catch (e) {
    res.status(400).send(`Error in database ${e}`);
  }
};
