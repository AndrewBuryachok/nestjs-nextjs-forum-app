import useSWR from 'swr';
import { BaseTown, TownChunk } from './types';
import { BaseUser } from '../users/types';
import { fetcher } from '@/lib/fetcher';

export const useSelectAllTowns = (shouldFetch = true) =>
  useSWR<BaseTown[]>(shouldFetch ? '/api/towns/all/select' : null, fetcher);

export const useSelectTownResidents = (townId: number) =>
  useSWR<BaseUser[]>(`/api/residents/${townId}/select`, fetcher);

export const useSelectTownChunks = (townId: number) =>
  useSWR<TownChunk[]>(`/api/towns/${townId}/chunks`, fetcher);
