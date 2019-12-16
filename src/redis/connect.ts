import { Tedis } from 'tedis';
import chalk from 'chalk';
import { redisPort, redisHost } from '../utils/env-config';

export const tedis = new Tedis({
  port: redisPort,
  host: redisHost,
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
