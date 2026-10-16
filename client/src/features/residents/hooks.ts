import useSWR from 'swr';
import { BaseUser } from '../users/types';
import { fetcher } from '@/lib/fetcher';

export const useSelectNotResidents = (shouldFetch = true) =>
  useSWR<BaseUser[]>(shouldFetch ? '/api/residents/not/select' : null, fetcher);
