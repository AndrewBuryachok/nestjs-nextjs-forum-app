import { BasePlace } from '@/features/places/types';
import CustomText from './custom-text';
import { placeColor } from '@/lib/place';

type Props = {
  place: BasePlace;
};

export default function PlaceText(props: Props) {
  const color = placeColor(props.place.x, props.place.y);

  return (
    <div>
      <CustomText value={props.place.name} />
      <CustomText color={color} value={`${props.place.x} ${props.place.y}`} />
    </div>
  );
}
