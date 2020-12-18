import jwt from 'jsonwebtoken';
import { env } from '../config/env-config';

export const generateJWTAccessToken = (
  username: string,
  id: number,
): string => jwt.sign({ username, id }, env('TOKENSECRET'), {
  expiresIn: 172800, // 48 hours
});

export const verifyJWTtoken = (token: string): string | boolean => {
  try {
    const extractToken = token.split(' ')[1];
    return jwt.verify(extractToken, env('TOKENSECRET')) as string;
  } catch (e) {
    return false;
  }
};
