import { connection } from './connect';

export const promiseQuery = (dbQuery: string, args: Array<string | number>): Promise<[{email: string ;password: string}]> => new Promise((resolve, reject) => {
  connection.query(dbQuery, args || [], (err, result) => {
    if (err) {
      return reject();
    }
    return resolve(result);
  });
});
