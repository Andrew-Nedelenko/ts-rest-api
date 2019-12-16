import { Request, Response } from 'express';
import uuid from 'uuid/v4';
import { tedis } from '../../redis/connect';
import { generateAccessToken } from '../../utils/token-generate';
import { accessTokenLife } from '../../utils/env-config';

export const userLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const accessToken = generateAccessToken(req.locals[0].id);
    const refreshToken = uuid();
    await tedis.hmset(req.locals[0].id, {
      ip: req.connection.remoteAddress as string,
      userAgent: req.headers['user-agent'] as string,
      accessToken,
      refreshToken,
      username: req.locals[0].username,
      email: req.body.email,
      ban: 0,
      expires: Date.now() + accessTokenLife,
    });
    await tedis.expire(req.locals[0].id, accessTokenLife);
    res.cookie('sid', accessToken, { expires: new Date(Date.now() + accessTokenLife), httpOnly: true });
    res.cookie('sid:sing', refreshToken, { expires: new Date(Date.now() + accessTokenLife), httpOnly: true });
    res.send({
      email: req.body.email,
      id: req.locals[0].id,
      status: 200,
      token: generateAccessToken(req.locals[0].id),
    });
  } catch (e) {
    res.sendStatus(400);
  }
};
