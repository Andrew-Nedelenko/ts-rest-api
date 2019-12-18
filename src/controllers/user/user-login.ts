import { Request, Response } from 'express';
import uuid from 'uuid/v4';
import { tedis } from '../../redis/connect';
import { generateAccessToken } from '../../utils/token-generate';
import { accessTokenLife } from '../../utils/env-config';


export const userLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const [localData] = req.locals;
    const accessToken = generateAccessToken(localData.id);
    const refreshToken = uuid();
    const userRedisId = `${localData.id}@${refreshToken}`;
    await tedis.hmset(userRedisId, {
      ip: req.connection.remoteAddress as string,
      userAgent: req.headers['user-agent'] as string,
      accessToken,
      refreshToken,
      username: localData.username,
      email: req.body.email as string,
      ban: 0,
      lastVisit: Date.now(),
    });
    await tedis.expire(userRedisId, accessTokenLife);

    res.cookie('sid', accessToken, { expires: (new Date(Date.now() + accessTokenLife)), httpOnly: true });
    res.cookie('sid:sing', refreshToken, { expires: (new Date(Date.now() + accessTokenLife)), httpOnly: true });
    res.send({
      email: req.body.email,
      id: userRedisId,
      status: 200,
      token: generateAccessToken(localData.id),
    });
  } catch (e) {
    res.sendStatus(400);
  }
};
