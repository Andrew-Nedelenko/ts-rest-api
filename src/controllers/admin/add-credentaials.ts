import { Request, Response } from 'express';
import { promiseQuery } from '../../models/mysql-promisify';

interface AddCredentialsTypes {
  ip: string;
  domain: string;
  project: string;
}

interface AllowCredentials {
  [key: string]: string | number;
}

export const addCredentials = async (req: Request, res: Response) => {
  const { ip, domain, project }: AddCredentialsTypes = req.body;
  try {
    const allowCredentials: AllowCredentials[] = await promiseQuery('INSERT INTO credentialsClients (ip, domain, project, banned) VALUES (?, ?, ?, ?);', [ip, domain, project, 0]);
    res.send(allowCredentials);
  } catch (e) {
    res.status(208).send('Already allowed!');
  }
};
