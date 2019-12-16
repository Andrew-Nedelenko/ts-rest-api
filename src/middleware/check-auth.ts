import { Request, Response, NextFunction } from 'express';
import { tedis } from '../redis/connect';
import { extractUserId } from '../utils/token-generate';
import { accessTokenLife } from '../utils/env-config';


export const checkAuth = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const userId = extractUserId(req.cookies.sid);
  const {
    userAgent, accessToken, refreshToken, ip, ban,
  } = await tedis.hgetall(userId);
  if (userAgent === req.headers['user-agent']
    && accessToken === req.cookies.sid
    && refreshToken === req.cookies['sid:sing']
    && ip === req.connection.remoteAddress
    && ban === '0') {
    await tedis.expire(userId, accessTokenLife);
    return next();
  }
  return res.sendStatus(401);
};
