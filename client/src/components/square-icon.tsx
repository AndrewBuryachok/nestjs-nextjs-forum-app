import { Square } from '@chakra-ui/react';
import { Color } from '@/constants/colors';

type Props = {
  color?: Color;
  children: React.ReactNode;
};

export default function SquareIcon(props: Props) {
  const bg = props.color ? `${props.color}.500` : 'bg.muted';

  return (
    <Square bg={bg} borderRadius='sm' size='8'>
      {props.children}
    </Square>
  );
}
