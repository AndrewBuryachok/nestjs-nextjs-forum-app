import { BasePlace } from '@/features/places/types';
import CustomText from './custom-text';

type Props = {
  place: BasePlace;
};

export default function PlaceText(props: Props) {
  return (
    <div>
      <CustomText value={props.place.name} />
      <CustomText muted value={`${props.place.x} ${props.place.y}`} />
    </div>
  );
}
