import { Request, Response, NextFunction } from 'express';
import db from '../models/Database';

interface Credentials {
  [key: string]: string | number;
}

export const accessControl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress as unknown as string;
  const checkAlowed: Credentials[] = await db.promiseQuery(
    'SELECT * FROM credentialsClients WHERE ip = ? HAVING banned = ?', [ip as string, 0],
  );
  if (checkAlowed.length > 0) {
    next();
  } else {
    res.sendStatus(403);
  }
};
