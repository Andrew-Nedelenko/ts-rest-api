/* eslint-disable max-len */
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

const checkConnection = (): Promise<{}> => new Promise((resolve, reject) => {
  connection.query('SELECT 1 + 1', (err, result) => {
    if (!err) {
      return resolve(result);
    }
    return reject();
  });
});

checkConnection().then(() => {
  global.console.log(chalk.blue('MySql connection succesfully!'));
}).catch((e) => {
  global.console.log(chalk.red(`MySql connection error!\n${e}`));
});


export const migration = async (): Promise<void> => {
  const create = await Promise.all([
    connection.query('CREATE TABLE IF NOT EXISTS userAuth (id int(11) UNSIGNED NOT NULL AUTO_INCREMENT, username varchar(150), email varchar(200), phone varchar(15), password varchar(255), ban BOOLEAN,createdAt DATETIME NOT NULL DEFAULT NOW(), updatedAt DATETIME NOT NULL DEFAULT NOW(), PRIMARY KEY (id), KEY (id));'),
    connection.query('CREATE TABLE IF NOT EXISTS credentialsClients (id int (11) UNSIGNED NOT NULL AUTO_INCREMENT, ip varchar(100) UNIQUE, domain varchar(255), project varchar(255), banned tinyint(1), createdAt DATETIME NOT NULL DEFAULT NOW(), updatedAt DATETIME NOT NULL DEFAULT NOW(), PRIMARY KEY (id), KEY (id));'),
    connection.query('CREATE TABLE IF NOT EXISTS userPosts (id int(11) UNSIGNED NOT NULL AUTO_INCREMENT, avatar varchar(255), createdAt DATETIME NOT NULL DEFAULT NOW(), updatedAt DATETIME NOT NULL DEFAULT NOW(), PRIMARY KEY (id), FOREIGN KEY (id) REFERENCES userAuth (id));'),
  ]);
  create.map((item) => global.console.info(`${chalk.blue(item.sql)}\n`));
};
migration().catch((e) => { throw new Error(e); });
