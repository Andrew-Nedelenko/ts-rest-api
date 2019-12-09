import { Request, Response } from 'express';
import { promiseQuery } from '../../models/mysql-promisify';

export const findUser = async (req: Request, res: Response): Promise<void> => {
  const id: number = parseFloat(req.params.id);
  try {
    const query = await promiseQuery('SELECT * FROM userAuth WHERE id = ?;', [id]);
    res.send(query);
  } catch (e) {
    res.status(400).send('Bad request');
  }
};

export const paginateUsers = async (req: Request, res: Response): Promise<void> => {
  const limit: number = parseFloat(req.params.limit) || 5;
  const page: number = parseFloat(req.params.page);
  try {
    if (limit > 50) {
      res.status(400).send('max 50 per requset');
    } else {
      const [count] = await promiseQuery('SELECT COUNT(id) FROM userAuth', []);
      const data = await promiseQuery('SELECT id, username, email FROM userAuth LIMIT ? OFFSET ?',
        [limit, (page * limit) - limit]);
      res.send({ data, count: count['COUNT(id)'] });
    }
  } catch (e) {
    res.sendStatus(403);
  }
};
