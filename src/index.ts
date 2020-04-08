import express, { Express } from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import chalk from 'chalk';
import { port, origin } from './utils/env-config';
import './models/Database';


export const app: Express = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(logger('dev'));
}

app
  .use(cors({
    credentials: true,
    origin,
  }))
  .use(helmet())
  .use('/', (req, res) => { res.send('ok'); });


app.listen(port, (): void => global.console.log(chalk.cyan(`Server listen on ${port}`)));
