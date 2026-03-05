import { Input, InputGroup } from '@chakra-ui/react';
import { BasePlace } from '@/features/places/types';
import PlaceIcon from './place-icon';

type Props = {
  place: BasePlace;
};

export default function PlaceInput(props: Props) {
  const value = `${props.place.name} (${props.place.x} ${props.place.y})`;

  return (
    <InputGroup startAddon={<PlaceIcon place={props.place} />}>
      <Input readOnly value={value} />
    </InputGroup>
  );
}
