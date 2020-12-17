import jwt from 'jsonwebtoken';
import { tokenSecret } from '../config/env-config';

export const generateJWTAccessToken = (
  username: string,
  id: number,
): string => jwt.sign({ username, id }, tokenSecret, {
  expiresIn: 172800, // 48 hours
});

export const verifyJWTtoken = (token: string): string | boolean => {
  try {
    const extractToken = token.split(' ')[1];
    return jwt.verify(extractToken, tokenSecret) as string;
  } catch (e) {
    return false;
  }
};
