import express, { Express } from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import chalk from 'chalk';
import { port, origin } from './utils/env-config';
import { router } from './router/routes';
import './models/connect';
import './redis/connect';
import './utils/token-generate';


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
  .use(router);


app.listen(port, '192.168.7.39', (): void => global.console.log(chalk.cyan(`Server listen on ${port}`)));
