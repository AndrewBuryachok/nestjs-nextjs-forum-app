import useSWR from 'swr';
import { SelectCard, SelectCardWithBalance } from './types';
import { fetcher } from '@/lib/fetcher';

export const useSelectMyCards = () =>
  useSWR<SelectCardWithBalance[]>('/api/cards/my/select', fetcher);

export const useSelectUserCards = (userId: number) =>
  useSWR<SelectCard[]>(userId ? `/api/cards/${userId}/select` : null, fetcher);

export const useSelectUserCardsWithBalance = (userId: number) =>
  useSWR<SelectCardWithBalance[]>(
    userId ? `/api/cards/${userId}/select-with-balance` : null,
    fetcher,
  );
