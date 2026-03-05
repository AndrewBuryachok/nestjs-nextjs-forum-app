import { Box } from '@chakra-ui/react';
import { Item } from '@/constants/items';

type Props = {
  item: Item;
};

export default function ItemImage(props: Props) {
  const index = Object.values(Item).indexOf(props.item);
  const x = -32 * (index % 32);
  const y = -32 * Math.floor(index / 32);

  return (
    <Box
      backgroundImage='url(/items.png)'
      backgroundPositionX={x}
      backgroundPositionY={y}
      backgroundSize={1024}
      flexShrink={0}
      imageRendering='pixelated'
      h='8'
      w='8'
    />
  );
}
