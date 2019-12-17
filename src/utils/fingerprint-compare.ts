export interface UserFingerprintTypes {
    ip: string;
    userAgent: string;
    accessToken: string;
    refreshToken: string;
    ban: string;
    username?: string;
    email?: string;
}

export const FingerprintCompare = (
  userIncom: UserFingerprintTypes,
  dbData: UserFingerprintTypes,
): boolean => JSON.stringify(userIncom) === JSON.stringify(dbData);


export const fingerprinting = (
  ip: string,
  userAgent: string,
  accessToken: string,
  refreshToken: string,
  ban: string,
): UserFingerprintTypes => ({
  ip,
  userAgent,
  accessToken,
  refreshToken,
  ban,
});
