import { Request, Response, NextFunction } from 'express';
import { tedis } from '../redis/connect';
import { extractUserId } from '../utils/token-generate';
import { FingerprintCompare, fingerprinting, UserFingerprintTypes } from '../utils/fingerprint-compare';


export const checkAuth = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const userId: string = extractUserId(req.cookies.sid);
  const userRedisId = `${userId}@${req.cookies['sid:sing']}`;
  const {
    ip, userAgent, accessToken, refreshToken, ban, username, email,
  } = await tedis.hgetall(userRedisId);

  const checkBannedToken: number = parseFloat(ban);
  if (checkBannedToken > 0) {
    return res.status(403).send('This token in ban!');
  }

  const userRequestData: UserFingerprintTypes = fingerprinting(
      req.connection.remoteAddress as string,
      req.headers['user-agent'] as string,
      req.cookies.sid, req.cookies['sid:sing'], ban,
  );

  const dbRequestData: UserFingerprintTypes = fingerprinting(ip, userAgent, accessToken, refreshToken, ban);

  if (FingerprintCompare(userRequestData, dbRequestData)) {
    dbRequestData.username = username;
    dbRequestData.email = email;
    req.locals = dbRequestData;
    return next();
  }

  return res.sendStatus(401);
};
