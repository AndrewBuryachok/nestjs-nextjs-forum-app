import { HStack } from '@chakra-ui/react';
import { TownChunk } from '@/features/towns/types';
import ChunkIcon from './chunk-icon';
import CustomText from './custom-text';

type Props = {
  chunk: TownChunk;
};

export default function ChunkIconWithText(props: Props) {
  const value = `${props.chunk.x} ${props.chunk.y}`;

  return (
    <HStack>
      <ChunkIcon />
      <CustomText value={value} />
    </HStack>
  );
}
