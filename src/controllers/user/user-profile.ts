import { Request, Response } from 'express';
import uuid from 'uuid/v4';
import { UserAuthDb } from '../../middleware/user-auth';
import { generateAccessToken, extractUserId } from '../../utils/token-generate';
import { accessTokenLife } from '../../utils/env-config';
import { tedis } from '../../redis/connect';

export const userProfile = async (req: Request, res: Response): Promise<void> => {
  const { accessToken, email, username } = req.locals as UserAuthDb;
  const getUserId: string = extractUserId(accessToken);
  const newAccessToken: string = generateAccessToken(getUserId);
  const newRefreshToken: string = uuid();
  try {
    await tedis.hmset(getUserId, {
      ip: req.connection.remoteAddress as string,
      userAgent: req.headers['user-agent'] as string,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      username,
      email,
      ban: 0,
      expires: Date.now() + accessTokenLife,
    });
    await tedis.expire(getUserId, accessTokenLife);
    res.cookie('sid', newAccessToken, { expires: new Date(Date.now() + accessTokenLife), httpOnly: true });
    res.cookie('sid:sing', newRefreshToken, { expires: new Date(Date.now() + accessTokenLife), httpOnly: true });
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
