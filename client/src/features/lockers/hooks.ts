import useSWR from 'swr';
import { BaseLocker } from './types';
import { fetcher } from '@/lib/fetcher';

export const useSelectAllLockers = (shouldFetch = true) =>
  useSWR<BaseLocker[]>(shouldFetch ? '/api/lockers/all/select' : null, fetcher);
