import useSWR from 'swr';
import { BaseMarket } from './types';
import { fetcher } from '@/lib/fetcher';

export const useSelectMyMarkets = () =>
  useSWR<BaseMarket[]>('/api/markets/my/select', fetcher);

export const useSelectUserMarkets = (userId: number) =>
  useSWR<BaseMarket[]>(
    userId ? `/api/markets/${userId}/select` : null,
    fetcher,
  );
