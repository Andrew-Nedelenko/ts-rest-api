import { Tedis } from 'tedis';
import chalk from 'chalk';
import { env } from '../config/env-config';

export const tedis = new Tedis({
  port: parseFloat(env('REDISPORT')),
  host: env('REDISHOST'),
});

const checkRedisConnetion = async (query: string): Promise<void> => {
  try {
    await tedis.command(query);
    global.console.log(chalk.blue('Redis connection succesfully!'));
  } catch (e) {
    throw new Error(e);
  }
};

checkRedisConnetion('PING');
