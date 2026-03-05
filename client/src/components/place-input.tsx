import { Input } from '@chakra-ui/react';
import { BasePlace } from '@/features/places/types';

type Props = {
  place: BasePlace;
};

export default function PlaceInput(props: Props) {
  const value = `${props.place.name} (${props.place.x} ${props.place.y})`;

  return <Input readOnly value={value} />;
}
