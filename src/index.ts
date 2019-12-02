import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import chalk from 'chalk';
import { port } from './utils/env-config';
import { router } from './router/routes';
import './models/connect';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(logger('dev'));
}

app
  .use(helmet())
  .use(router);

app.listen(port, () => console.log(chalk.cyan(`Server listen on ${port}`)));
