import { Town, TownChunkWithTown } from '../types';
import { get, select } from '@/lib/api';
import TownLineWithCircle from './town-line-with-circle';

export default async function TownsMap() {
  const [towns, chunks] = await Promise.all([
    get<Town>('/towns', { page: 0 }),
    select<TownChunkWithTown>('/towns/all/chunks'),
  ]);

  return (
    <>
      {towns.data.map((town) => (
        <TownLineWithCircle
          key={town.id}
          town={town}
          chunks={chunks.filter((chunk) => chunk.townId === town.id)}
        />
      ))}
    </>
  );
}
