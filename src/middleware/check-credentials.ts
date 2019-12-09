import { Request, Response, NextFunction } from 'express';
import { promiseQuery } from '../models/mysql-promisify';

interface Credentials {
  [key: string]: string | number;
}

export const accessControl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const ip: any = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const checkAlowed: Credentials[] = await promiseQuery(
    'SELECT * FROM credentialsClients WHERE ip = ? HAVING banned = ?', [ip, 0],
  );
  if (checkAlowed.length > 0) {
    next();
  } else {
    res.sendStatus(403);
  }
};
