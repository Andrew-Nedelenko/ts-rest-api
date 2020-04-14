import { Request, Response } from 'express';
import { UserAuthDb } from '../../middleware/user-auth';
import { cookieSettings } from '../../utils/cookies.config';
import { generateAccessToken, extractUserId, base64encode } from '../../utils/token-generate';
import { accessTokenLife } from '../../config/env-config';
import { tedis } from '../../redis/connect';
import { dataRedis } from '../../redis/object-redis';

export const userProfile = async (req: Request, res: Response): Promise<void> => {
  const {
    accessToken, email, username, ban,
  } = req.locals as UserAuthDb;
  const getUserId: string = extractUserId(accessToken);
  const newAccessToken: string = generateAccessToken(getUserId);
  const newRefreshToken: string = base64encode(req.headers['user-agent'] as string);
  const userRedisId = `${getUserId}@${newRefreshToken}`;

  try {
    await tedis.hmset(userRedisId, dataRedis(req.connection.remoteAddress as string,
      req.headers['user-agent'] as string, newAccessToken, newRefreshToken, username, email, ban));
    await tedis.expire(userRedisId, accessTokenLife);

    res.cookie('sid', newAccessToken, cookieSettings());
    res.cookie('sid:sing', newRefreshToken, cookieSettings());
    res.json({
      newAccessToken,
      newRefreshToken,
      ip: req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
      loc: req.locals,
    });
  } catch (e) {
    res.sendStatus(400);
  }
};
