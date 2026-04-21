import 'server-only';
import xior, { isXiorError, merge } from 'xior';
import { getAccessToken } from './tokens';
import { Request } from '@/types/request';
import { Response } from '@/types/response';
import { PAGE_SIZE } from '@/constants/pagination';

const api = xior.create({
  baseURL: process.env.API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (!token) {
    return config;
  }
  return merge(config, { headers: { Authorization: `Bearer ${token}` } });
});

export async function get<T>(route: string, { page, ...req }: Request) {
  try {
    const params = page
      ? { ...req, skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE }
      : req;
    const res = await api.get<Response<T>>(route, { params });
    return res.data;
  } catch (error) {
    return { data: [], total: 0 };
  }
}

export async function select<T>(route: string) {
  try {
    const res = await api.get<T[]>(route);
    return res.data;
  } catch (error) {
    return [];
  }
}

export async function send<T, U>(
  method: 'POST' | 'PATCH' | 'DELETE',
  route: string,
  body?: T,
) {
  try {
    const res = await api.request<U>({ method, url: route, data: body });
    return { ok: true, data: res.data };
  } catch (error) {
    if (isXiorError<{ message: string }>(error)) {
      return { ok: false, message: error.response?.data.message };
    }
    return { ok: false };
  }
}
