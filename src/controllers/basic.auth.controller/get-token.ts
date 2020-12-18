import { Request, Response } from 'express';
import { generateJWTAccessToken } from '../../utils/jwt-tokens';

export const getToken = async (req: Request, res: Response): Promise<void> => {
  res.send({
    accessToken: generateJWTAccessToken(req.locals[0].username, req.locals[0].id),
    // verify: verifyJWTtoken(`Bearer ${generateJWTAccessToken(req.locals[0].username, req.locals[0].id)}`),
  });
};
