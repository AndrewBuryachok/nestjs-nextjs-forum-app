import useSWR from 'swr';
import { BaseRent } from './types';
import { fetcher } from '@/lib/fetcher';

export const useSelectMyRents = () =>
  useSWR<BaseRent[]>('/api/rents/my/select', fetcher);

export const useSelectUserRents = (userId: number) =>
  useSWR<BaseRent[]>(userId ? `/api/rents/${userId}/select` : null, fetcher);
