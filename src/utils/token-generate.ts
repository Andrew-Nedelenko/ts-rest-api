import { randomBytes } from 'crypto';

export const base64encode = (str: string): string => Buffer.from(str).toString('base64');
export const decodeBase64 = (str: string): string => Buffer.from(str, 'base64').toString('ascii');

export const generateAccessToken = (userId: string): string => {
  const genHeadBytes = randomBytes(128).toString('base64');
  const genTailBytes = randomBytes(128).toString('base64');
  const firstSplit = genHeadBytes.split('/')[0];
  const concatId = firstSplit.concat(`/${userId}/`);
  return concatId.concat(genTailBytes);
};


export const extractUserId = (token: string): string => {
  const extacting = token.split('/')[1];
  return extacting;
};
