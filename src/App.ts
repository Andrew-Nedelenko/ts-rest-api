import express, { Express } from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { userRouter } from './router/user.routes';
import { adminRouter } from './router/admin.routes';
import { env } from './config/env-config';

class App {
  private readonly app: Express;

  constructor() {
    this.app = express();
    this.config();
  }

  getApp(): Express {
    return this.app;
  }

  private config(): void {
    this.app
      .use(helmet())
      .use(logger('dev'))
      .use(
        cors({
          credentials: true,
          origin: env('ORIGIN'),
        }),
      )
      .use('/user', userRouter)
      .use('/admin/:key', adminRouter);
  }
}

export default new App().getApp();
