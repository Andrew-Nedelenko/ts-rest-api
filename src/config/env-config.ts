import dotenv from 'dotenv';
import { join } from 'path';
import { red } from 'chalk';

class Env {
    private readonly root = join.bind(this, __dirname, '../../env');

    private readonly process = process.env;

    constructor() {
      dotenv.config({ path: this.root(process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev') });
    }

    getEnv(en: string): string {
      if (typeof this.process[en] === 'undefined') {
        throw new Error(red(`${en} equals ${typeof process.env[en]}!`));
      }
      return this.process[en] as string;
    }
}

export const env = (variable: string): string => new Env().getEnv(variable);
