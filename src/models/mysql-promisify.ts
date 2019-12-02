import { connection } from './connect';

// eslint-disable-next-line max-len
export const promiseQuery = (dbQuery: string, args: Array<string | number>): Promise<void> => new Promise((resolve, reject) => {
  connection.query(dbQuery, args || [], (err, result) => {
    if (err) {
      return reject();
    }
    return resolve(result);
  });
});
