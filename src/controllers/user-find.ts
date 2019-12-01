import { Request, Response } from 'express';
import { connection } from '../models/connect';

export const findUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM userAuth WHERE id = ${id}`, (err, result) => {
      if (err) {
        reject();
      }
      resolve(result);
    });
  }).then((data) => {
    res.send(data);
  });
};
