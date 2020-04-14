import { Request, Response } from 'express';
import { tedis } from '../../redis/connect';
import { dataRedis } from '../../redis/object-redis';
import { cookieSettings } from '../../utils/cookies.config';
import { generateAccessToken, base64encode } from '../../utils/token-generate';
import { accessTokenLife } from '../../config/env-config';


export const userLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const [localData] = req.locals;
    const accessToken = generateAccessToken(localData.id);
    const refreshToken = base64encode(req.headers['user-agent'] as string);
    const userRedisId = `${localData.id}@${base64encode(req.headers['user-agent'] as string)}`;
    await tedis.hmset(userRedisId, dataRedis(req.connection.remoteAddress as string,
      req.headers['user-agent'] as string, accessToken, refreshToken,
      localData.username, localData.email, localData.ban));
    await tedis.expire(userRedisId, accessTokenLife);

    res.cookie('sid', accessToken, cookieSettings());
    res.cookie('sid:sing', refreshToken, cookieSettings());
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
