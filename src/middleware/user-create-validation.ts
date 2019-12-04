import { Request, Response, NextFunction } from 'express';
import { promiseQuery } from '../models/mysql-promisify';

export const createUserValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    username, password, email, phone,
  } = req.body;
  const errors: {username?: string; password?: string; email?: string; phone?: string} = {};

  if (!String(username).trim()) {
    errors.username = 'username is require';
  }
  if (!String(password).trim()) {
    errors.password = 'password is require';
  }
  if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(String(email))) {
    errors.email = 'email is not valid';
  } else {
    const checkEmail: Array<{}> = await promiseQuery('SELECT * FROM userAuth WHERE email = ?;', [email]);
    if (checkEmail.length > 0) {
      errors.email = 'email already exist';
    }
  }
  if (!(/((\+)?\b(8|38)?(0[\d]{2}))([\d-]{5,8})([\d]{2})/).test(phone)) {
    errors.phone = 'phone is not valid';
  } else {
    const checkPhone: Array<{}> = await promiseQuery('SELECT * FROM userAuth WHERE phone = ?', [phone]);
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
