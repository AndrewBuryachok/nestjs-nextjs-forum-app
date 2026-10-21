import { setSeederFactory } from 'typeorm-extension';
import { TownChunk } from '../../features/towns/town-chunk.entity';

export default setSeederFactory(TownChunk, (faker) => {
  const townChunk = new TownChunk();
  return townChunk;
});
