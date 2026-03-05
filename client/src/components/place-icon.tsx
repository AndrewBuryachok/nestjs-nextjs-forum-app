import { LuHouse } from 'react-icons/lu';
import { BasePlace } from '@/features/places/types';
import SquareIcon from './square-icon';
import { placeColor } from '@/lib/place';

type Props = {
  place?: BasePlace;
};

export default function PlaceIcon(props: Props) {
  const color = props.place && placeColor(props.place.x, props.place.y);

  return (
    <SquareIcon color={color}>
      <LuHouse />
    </SquareIcon>
  );
}
