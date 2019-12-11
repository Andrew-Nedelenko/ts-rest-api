import { Request, Response, NextFunction } from 'express';
import argon from 'argon2';
import { promiseQuery } from '../models/mysql-promisify';

export interface ExtendedRequest extends Request{
  email: string;
  password: string;
  locals: UserAuthDb[];
}

type UserAuthDb = {
  [key: string]: string;
}


export const userAuth = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<void> => {
  const { email, password }: ExtendedRequest = req.body;
  try {
    const data: UserAuthDb[] = await promiseQuery('SELECT * FROM userAuth WHERE email = ?', [email]);
    if (data.length > 0) {
      const compare: boolean = await argon.verify(data[0].password, password);
      if (compare) {
        req.locals = data;
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
