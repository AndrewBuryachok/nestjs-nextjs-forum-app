import 'server-only';
import xior from 'xior';
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
