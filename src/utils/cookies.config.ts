interface CookieSettingsType {
    [key: string]: string | boolean | Date | number;
}

export const cookieSettings = (): CookieSettingsType => ({
  expires: new Date(Date.now() + 9000000),
  maxAge: 1000 * 60 * 15,
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  path: '/',
});
