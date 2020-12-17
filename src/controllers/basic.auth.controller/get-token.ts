import { Request, Response } from 'express';
import { generateJWTAccessToken, verifyJWTtoken } from '../../utils/jwt-tokens';

export const getToken = async (req: Request, res: Response): Promise<void> => {
  res.send({
    accessToken: generateJWTAccessToken(req.locals.username, 1),
    virify: verifyJWTtoken(`Bearer ${generateJWTAccessToken('john', 1)}`),
  });
};
