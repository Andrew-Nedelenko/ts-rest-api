import { Request, Response, NextFunction } from 'express';
import { verifyJWTtoken } from '../utils/jwt-tokens';

export const jwtVefiry = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization;

  if (verifyJWTtoken(token as string)) {
    req.locals = verifyJWTtoken(token as string);
    next();
  } else {
    res.status(401).send({ msg: 'undefined token' });
  }
};
