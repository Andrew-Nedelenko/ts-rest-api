import express from 'express';
import * as port from './utils/env-config';
import {router} from './router/routes';

const app = express();

app.use(router);

app.listen(port);