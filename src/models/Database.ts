import mysql, { Pool } from 'mysql';
import {
  dbhost, dbname, dbpass, dbuser,
} from '../utils/env-config';

class Database {
  private readonly db: string = dbname as string;

  private readonly host: string = dbhost as string;

  private readonly username: string = dbuser as string;

  private readonly password: string = dbpass as string;

  private connection(): Pool {
    return mysql.createPool({
      host: this.host,
      database: this.db,
      user: this.username,
      password: this.password,
    });
  }

  promiseQuery<T>(query: string, args: Array<string | number>): Promise<T> {
    return new Promise((res, rej) => {
      const conn = this.connection();
      conn.query(query, args, (err, result) => {
        if (!err) {
          res(result);
        }
        return rej(err);
      });
    });
  }
}

export default new Database();
