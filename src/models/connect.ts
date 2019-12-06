import mysql, { Query } from 'mysql';
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

const checkConnection = (): Promise<{}> => new Promise((resolve, reject) => {
  connection.query('SELECT 1 + 1', (err, result) => {
    if (!err) {
      return resolve(result);
    }
    return reject();
  });
});

checkConnection().then(() => {
  global.console.log(chalk.blue('Database connection succesfully!'));
}).catch((e) => {
  global.console.log(chalk.red(`Database connection error!\n${e}`));
});


export const migration = async (): Promise<void> => {
  // eslint-disable-next-line max-len
  const userAuthTable = connection.query('CREATE TABLE IF NOT EXISTS userAuth (id int(11) UNSIGNED NOT NULL AUTO_INCREMENT, username varchar(150), email varchar(200), phone varchar(15), password varchar(255),createdAt DATETIME NOT NULL DEFAULT NOW(), updatedAt DATETIME NOT NULL DEFAULT NOW(), PRIMARY KEY (id), KEY (id));');
  // eslint-disable-next-line max-len
  const credentialsClients: mysql.Query = connection.query('CREATE TABLE IF NOT EXISTS credentialsClients (id int (11) UNSIGNED NOT NULL AUTO_INCREMENT, ip varchar(100) UNIQUE, domain varchar(255), project varchar(255), banned tinyint(1), createdAt DATETIME NOT NULL DEFAULT NOW(), updatedAt DATETIME NOT NULL DEFAULT NOW(), PRIMARY KEY (id), KEY (id));');
  return new Promise((resolve) => {
    if (credentialsClients) {
      // eslint-disable-next-line no-console
      console.log(chalk.magenta('SQL query'), chalk.blue(credentialsClients.sql));
      resolve();
    }
  });
};
migration().catch((e) => { throw new Error(e); });
