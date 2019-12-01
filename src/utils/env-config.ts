import dotenv from 'dotenv';
import path from 'path';

const root = path.join.bind(this, __dirname, '../../');
dotenv.config({ path: root('.env') });

export const port = process.env.PORT;
export const dbname = process.env.DBNAME;
export const dbhost = process.env.DBHOST;
export const dbuser = process.env.DBUSER;
export const dbpass = process.env.DBPASS;
