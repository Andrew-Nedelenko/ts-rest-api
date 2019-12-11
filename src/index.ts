import express, { Application } from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import chalk from 'chalk';
import { port } from './utils/env-config';
import { router } from './router/routes';
import './models/connect';
import './redis/connect';

export const app: Application = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(logger('dev'));
}

app
  .use(cors())
  .use(helmet())
  .use(router);

// @ts-ignore
app.listen(port, '192.168.7.39', (): string => global.console.log(chalk.cyan(`Server listen on ${port}`)));
