import { Town } from '@/features/towns/types';
import { get } from '@/lib/api';
import PlaceLineWithCircle from './place-line-with-circle';

export default async function CustomMap() {
  const towns = await get<Town>('/towns', { page: 0 });

  return (
    <>
      {towns.data.map((town) => (
        <PlaceLineWithCircle key={town.id} town={town} />
      ))}
    </>
  );
}
