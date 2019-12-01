import { Request, Response } from 'express';
import { connection } from '../models/connect';

export const createuser = async (req: Request, res: Response): Promise<void> => {
  const {
    username, email, password, phone,
  } = req.body;
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO \`userAuth\` (username, email, password, phone) VALUES ('${username}', '${email}', '${password}', '${phone}' );`,
      (err, result) => {
        if (err) {
          reject();
          return res.status(400).send('Database error');
        }
        return resolve(result);
      });
  }).then((data) => {
    res.status(201).send(data);
  });
};
