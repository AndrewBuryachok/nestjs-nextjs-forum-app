import 'server-only';
import xior, { isXiorError } from 'xior';
import { Request } from '@/types/request';
import { Response } from '@/types/response';
import { PAGE_SIZE } from '@/constants/pagination';

const api = xior.create({
  baseURL: process.env.API_URL,
});

export async function get<T>(route: string, { page, ...req }: Request) {
  try {
    const params = { ...req, skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE };
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

export async function send<T>(
  method: 'POST' | 'PATCH' | 'DELETE',
  route: string,
  body?: T,
) {
  try {
    await api.request({ method, url: route, data: body });
    return { ok: true };
  } catch (error) {
    if (isXiorError<{ message: string }>(error)) {
      return { ok: false, message: error.response?.data.message };
    }
    return { ok: false };
  }
}
