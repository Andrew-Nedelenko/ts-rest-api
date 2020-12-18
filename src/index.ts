import chalk from 'chalk';
import app from './App';
import { env } from './config/env-config';
import './models/Database';

const port = env('PORT');
const expressApp = app.listen(port, (): void => global.console.log(chalk.cyan(`Server listen on ${port}`)));

export { expressApp as app };
