import mysql from 'mysql';
import chalk from 'chalk';
import {
  dbhost, dbname, dbpass, dbuser,
} from '../utils/env-config';

export const connection = mysql.createPool({
  host: dbhost,
  database: dbname,
  user: dbuser,
  password: dbpass,
});

const checkConnection = (): Promise<void> => new Promise((resolve) => {
  connection.query('SELECT 1 + 1');
  resolve();
});

checkConnection().then(() => {
  global.console.log(chalk.blue('Database connection succesfully!'));
}).catch((e) => {
  throw new Error(e);
});


export const migration = async (): Promise<void> => {
  // eslint-disable-next-line max-len
  const table = connection.query('CREATE TABLE IF NOT EXISTS userAuth (id int(11) UNSIGNED NOT NULL AUTO_INCREMENT, username varchar(150), email varchar(200), phone varchar(15), password varchar(255), salt varchar(255), PRIMARY KEY (id), KEY (id));');
  return new Promise((resolve) => {
    if (table) {
      // eslint-disable-next-line no-console
      console.log(chalk.magenta('SQL query'), chalk.blue(table.sql));
      resolve();
    }
  });
};
// migration().catch((e) => { throw new Error(e); });
