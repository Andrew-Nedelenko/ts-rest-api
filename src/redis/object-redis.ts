
interface DataRedisTypes {
    [key: string]: string | number;
}

export const dataRedis = (
  ip: string,
  userAgent: string,
  accessToken: string,
  refreshToken: string,
  username: string,
  email: string,
  ban: string,
): DataRedisTypes => ({
  ip,
  userAgent,
  accessToken,
  refreshToken,
  username,
  email,
  ban,
  lastVisit: Date.now(),
});
