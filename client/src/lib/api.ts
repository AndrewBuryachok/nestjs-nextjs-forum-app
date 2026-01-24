import 'server-only';
import xior from 'xior';

const api = xior.create({
  baseURL: process.env.API_URL,
});

export async function get<T>(route: string) {
  try {
    const res = await api.get<T[]>(route);
    return res.data;
  } catch (error) {
    return [];
  }
}
