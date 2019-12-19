import { accessTokenLife } from './env-config';

interface CookieSettingsType {
    [key: string]: string | boolean | Date;
}

export const cookieSettings = (): CookieSettingsType => ({
  expires: new Date(Date.now() + accessTokenLife),
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
});
