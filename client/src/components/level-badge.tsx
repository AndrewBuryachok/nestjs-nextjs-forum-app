import { Badge } from '@chakra-ui/react';
import { LuStar } from 'react-icons/lu';

type Props = {
  level: number;
};

export default function LevelBadge(props: Props) {
  const value = `${props.level}/${process.env.NEXT_PUBLIC_MAX_TOWN_LEVEL}`;

  return (
    <Badge>
      <LuStar />
      {value}
    </Badge>
  );
}
