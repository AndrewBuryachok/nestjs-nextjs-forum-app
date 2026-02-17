import bcrypt from 'bcrypt';

export const hashData = (data: string) => bcrypt.hash(data, 10);

export const compareData = (data: string, hash: string) =>
  bcrypt.compare(data, hash);
