import { Request, Response, NextFunction } from 'express';
import argon from 'argon2';
import db from '../models/Database';

export interface UserAuthRequestType{
  email: string;
  password: string;
}

declare module 'express-serve-static-core' {
  interface Request {
      locals: any;
  }
}

export type UserAuthDb = {
  [key: string]: string;
}

export const userAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password }: UserAuthRequestType = req.body;
  try {
    const data: UserAuthDb[] = await db.promiseQuery(`
    SELECT * FROM userAuth WHERE email = ?`, [email]);
    if (data.length > 0) {
      const compare: boolean = await argon.verify(data[0].password, password);
      if (compare) {
        req.locals = data;
        next();
      } else {
        res.status(401).json({ error: 'wrong email or password1' });
      }
    } else {
      res.status(401).json({ error: 'wrong email or password2' });
    }
  } catch (e) {
    res.status(400).send(`Error in database ${e}`);
  }
};
