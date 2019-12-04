import express, { Application } from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import chalk from 'chalk';
import { port } from './utils/env-config';
import { router } from './router/routes';
import './models/connect';

export const app: Application = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(logger('dev'));
}

app
  .use(cors())
  .use(helmet())
  .use(router);

app.listen(port, () => global.console.log(chalk.cyan(`Server listen on ${port}`)));
