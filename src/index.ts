import express from 'express';
import logger from 'morgan';
import chalk from 'chalk';
import { port } from './utils/env-config';
import { router } from './router/routes';
import './models/connect';

const app = express();

app
  .use(logger('dev'))
  .use(router);

app.listen(port, () => console.log(chalk.cyan(`Server listen on ${port}`)));
