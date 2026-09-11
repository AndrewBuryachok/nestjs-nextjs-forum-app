import { Market } from '@/features/markets/types';
import { Shop } from '@/features/shops/types';
import { Locker } from '@/features/lockers/types';
import { get } from '@/lib/api';
import PlaceLineWithCircle from './place-line-with-circle';

export default async function CustomMap() {
  const markets = await get<Market>('/markets', { page: 0 });
  const shops = await get<Shop>('/shops', { page: 0 });
  const lockers = await get<Locker>('/lockers', { page: 0 });

  return (
    <>
      {markets.data.map((market) => (
        <PlaceLineWithCircle key={market.id} place={market} type='market' />
      ))}
      {shops.data.map((shop) => (
        <PlaceLineWithCircle key={shop.id} place={shop} type='shop' />
      ))}
      {lockers.data.map((locker) => (
        <PlaceLineWithCircle key={locker.id} place={locker} type='locker' />
      ))}
    </>
  );
}
