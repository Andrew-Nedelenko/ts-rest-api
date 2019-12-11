import dotenv from 'dotenv';
import path from 'path';

const root = path.join.bind(this, __dirname, '../../');
dotenv.config({ path: root('.env') });

export const port: number | undefined = process.env.PORT as number | undefined;
export const dbname = process.env.DBNAME;
export const dbhost = process.env.DBHOST;
export const dbuser = process.env.DBUSER;
export const dbpass = process.env.DBPASS;
export const redisPort: number | undefined = process.env.REDISPORT as number | undefined;
export const redisHost = process.env.REDISHOST;
