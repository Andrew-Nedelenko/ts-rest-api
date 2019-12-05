import { Request, Response } from 'express';
import { promiseQuery } from '../../models/mysql-promisify';

export const addCredentials = async (req: Request, res: Response) => {
  const { ip, domain, project } = req.body;
  try {
    const allowCredentials = await promiseQuery('INSERT INTO credentialsClients (ip, domain, project, banned) VALUES (?, ?, ?, ?);', [ip, domain, project, 0]);
    res.send(allowCredentials);
  } catch (e) {
    res.status(400).send('Database error');
  }
};
