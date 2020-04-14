import { Request, Response, NextFunction } from 'express';
import db from '../models/Database';
import { emailValidator, phoneValidator } from '../utils/constants';

export interface CreateUserTypes {
  username: string;
  email: string;
  password: string;
  phone: string;
}

interface CreateUserErrors {
  username?: string;
  email?: string;
  password?: string;
  phone?: string;
}

export const createUserValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    username, password, email, phone,
  }: CreateUserTypes = req.body;
  const errors: CreateUserErrors = {};

  if (!String(username).trim()) {
    errors.username = 'username is require';
  }
  if (!String(password).trim()) {
    errors.password = 'password is require';
  }
  if (!(emailValidator).test(String(email))) {
    errors.email = 'email is not valid';
  } else {
    const checkEmail: CreateUserErrors[] = await db.promiseQuery('SELECT * FROM userAuth WHERE email = ?;', [email]);
    if (checkEmail.length > 0) {
      errors.email = 'email already exist';
    }
  }
  if (!(phoneValidator).test(phone)) {
    errors.phone = 'phone is not valid';
  } else {
    const checkPhone: CreateUserErrors[] = await db.promiseQuery('SELECT * FROM userAuth WHERE phone = ?', [phone]);
    if (checkPhone.length > 0) {
      errors.phone = 'phone already exist';
    }
  }
  if (Object.keys(errors).length) {
    res.status(409).json(errors);
  } else {
    next();
  }
};
