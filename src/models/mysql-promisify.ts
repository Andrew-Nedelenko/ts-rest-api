import { connection } from './connect';


export const promiseQuery = <T>(dbQuery: string, args: Array<string | string[] | number>):
Promise<T> => new Promise((resolve, reject) => {
    connection.query(dbQuery, args || [], (err, result): void => {
      if (err) {
        return reject();
      }
      return resolve(result);
    });
  });
