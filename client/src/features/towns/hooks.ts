import useSWR from 'swr';
import { BaseUser } from '../users/types';
import { fetcher } from '@/lib/fetcher';

export const useSelectTownUsers = (townId: number) =>
  useSWR<BaseUser[]>(`/api/towns/${townId}/users`, fetcher);

export const useSelectNotTownUsers = (shouldFetch = true) =>
  useSWR<BaseUser[]>(shouldFetch ? '/api/towns/not/users' : null, fetcher);
