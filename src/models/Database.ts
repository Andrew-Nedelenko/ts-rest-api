import mysql, { Pool } from 'mysql';
import {
  env,
} from '../config/env-config';

class Database {
  private readonly db: string = env('DBNAME');

  private readonly host: string = env('DBHOST');

  private readonly username: string = env('DBUSER');

  private readonly password: string = env('DBPASS');

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
