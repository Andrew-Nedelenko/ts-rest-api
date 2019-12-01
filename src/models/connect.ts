import mysql from 'mysql';
import chalk from 'chalk';
import {
  dbhost, dbname, dbpass, dbuser,
} from '../utils/env-config';

export const connection = mysql.createConnection({
  host: dbhost,
  database: dbname,
  user: dbuser,
  password: dbpass,
});

connection.connect();

export const migration = async (): Promise<void> => {
  const table = connection.query('CREATE TABLE IF NOT EXISTS userAuth (id int(11) UNSIGNED NOT NULL AUTO_INCREMENT, username varchar(150), email varchar(200), password varchar(255), phone varchar(15), PRIMARY KEY (id), KEY (id));');
  return new Promise((resolve) => {
    if (table) {
      // eslint-disable-next-line no-console
      console.log(chalk.magenta('SQL query'), chalk.blue(table.sql));
      resolve();
    }
  });
};
// migration().catch((e) => { throw new Error(e); });
