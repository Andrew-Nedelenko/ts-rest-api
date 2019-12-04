import { randomBytes, createHmac } from 'crypto';

export const encryption = (password: string): {salt: string; hash: string} => {
  const salt = randomBytes(16).toString('base64');
  const hash = createHmac('sha512', salt)
    .update(password)
    .digest('base64');
  return {
    salt,
    hash,
  };
};

const encriptedPassword = encryption('123456');
export const compareEncryption = (salt: string, password: string): boolean => {
  const createHash = createHmac('sha512', salt)
    .update(password)
    .digest('base64');
  return encriptedPassword.hash === createHash;
};

// console.log(compareEncryption(encriptedPassword.salt, '123456'));
