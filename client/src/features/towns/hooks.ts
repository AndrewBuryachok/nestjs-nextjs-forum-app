import useSWR from 'swr';
import { BaseUser } from '../users/types';
import { fetcher } from '@/lib/fetcher';

export const useSelectTownResidents = (townId: number) =>
  useSWR<BaseUser[]>(`/api/residents/${townId}/select`, fetcher);
