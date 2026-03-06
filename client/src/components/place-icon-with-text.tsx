import { HStack } from '@chakra-ui/react';
import { BasePlace } from '@/features/places/types';
import PlaceIcon from './place-icon';
import PlaceText from './place-text';

type Props = {
  place: BasePlace;
};

export default function PlaceIconWithText(props: Props) {
  return (
    <HStack>
      <PlaceIcon />
      <PlaceText place={props.place} />
    </HStack>
  );
}
