import chalk from 'chalk';
import app from './App';
import { port } from './utils/env-config';
import './models/Database';

const expressApp = app.listen(port, (): void => global.console.log(chalk.cyan(`Server listen on ${port}`)));

export { expressApp as app };
