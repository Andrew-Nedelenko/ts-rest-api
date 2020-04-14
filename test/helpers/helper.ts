export const randomInt = (
  min = 1111111,
  max = 9999999,
): number => Math.floor(Math.random() * (max - min + 1) + min);
