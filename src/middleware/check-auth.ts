import { Request, Response, NextFunction } from 'express';
import { tedis } from '../redis/connect';
import { extractUserId } from '../utils/token-generate';
import { accessTokenLife } from '../utils/env-config';
import { FingerprintCompare, fingerprinting, UserFingerprintTypes } from '../utils/fingerprint-compare';


export const checkAuth = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const userId: string = extractUserId(req.cookies.sid);
  const {
    ip, userAgent, accessToken, refreshToken, ban,
  } = await tedis.hgetall(userId);
  const userRequestData: UserFingerprintTypes = fingerprinting(
      req.connection.remoteAddress as string,
      req.headers['user-agent'] as string,
      req.cookies.sid, req.cookies['sid:sing'], '0',
  );
  const dbRequestData: UserFingerprintTypes = fingerprinting(ip, userAgent, accessToken, refreshToken, ban);
  if (FingerprintCompare(userRequestData, dbRequestData)) {
    await tedis.expire(userId, accessTokenLife);
    req.locals = dbRequestData;
    return next();
  }
  return res.sendStatus(401);
};
