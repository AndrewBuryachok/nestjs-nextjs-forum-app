import { TownChunk } from '@/features/towns/types';

export function chunkPath(chunks: TownChunk[]) {
  const set = new Set(chunks.map((chunk) => `${chunk.x},${chunk.y}`));
  let fill = '';
  let outline = '';
  for (const chunk of chunks) {
    const px = chunk.x * 16;
    const py = chunk.y * 16;
    fill += `M${px} ${py}h${16}v${16}h-${16}z`;
    if (!set.has(`${chunk.x},${chunk.y - 1}`)) {
      outline += `M${px} ${py}h${16}`;
    }
    if (!set.has(`${chunk.x},${chunk.y + 1}`)) {
      outline += `M${px} ${py + 16}h${16}`;
    }
    if (!set.has(`${chunk.x - 1},${chunk.y}`)) {
      outline += `M${px} ${py}v${16}`;
    }
    if (!set.has(`${chunk.x + 1},${chunk.y}`)) {
      outline += `M${px + 16} ${py}v${16}`;
    }
  }
  return { fill, outline };
}
