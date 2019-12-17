interface UserFingerprintTypes {
    ip: string;
    userAgent: string;
    accessToken: string;
    refreshToken: string;
    ban: string;
}

export const FingerprintCompare = (
  userIncom: UserFingerprintTypes,
  dbData: UserFingerprintTypes,
): boolean => JSON.stringify(userIncom) === JSON.stringify(dbData);


export const userFingerprint = (
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
