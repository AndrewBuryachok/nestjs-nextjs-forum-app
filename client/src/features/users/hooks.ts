import useSWR from 'swr';
import { BaseUser } from './types';
import { fetcher } from '@/lib/fetcher';

export const useSelectAllUsers = (shouldFetch = true) =>
  useSWR<BaseUser[]>(shouldFetch ? '/api/users/all/select' : null, fetcher);
