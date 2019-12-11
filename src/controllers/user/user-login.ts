import { Response } from 'express';
import { ExtendedRequest } from '../../middleware/user-auth';

export const userLogin = async (req: ExtendedRequest, res: Response): Promise<void> => {
  res.send({
    email: req.body.email,
    id: req.locals[0].id,
    status: 200,
  });
};
