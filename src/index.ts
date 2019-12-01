import express from 'express';
import logger from 'morgan';
import * as port from './utils/env-config';
import { router } from './router/routes';

const app = express();

app
  .use(logger('dev'))
  .use(router);

app.listen(port);
