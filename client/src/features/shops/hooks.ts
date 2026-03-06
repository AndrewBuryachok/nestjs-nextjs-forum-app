import useSWR from 'swr';
import { BaseShop } from './types';
import { fetcher } from '@/lib/fetcher';

export const useSelectMyShops = () =>
  useSWR<BaseShop[]>('/api/shops/my/select', fetcher);

export const useSelectUserShops = (userId: number) =>
  useSWR<BaseShop[]>(userId ? `/api/shops/${userId}/select` : null, fetcher);
