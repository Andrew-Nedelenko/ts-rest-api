import { connection } from './connect';

export const promiseQuery = (dbQuery: string): Promise<void> => new Promise((resolve, reject) => {
  connection.query(dbQuery, (err, result) => {
    if (err) {
      return reject();
    }
    return resolve(result);
  });
});
