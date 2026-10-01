import { useTranslations } from 'next-intl';
import { BasePlace } from '@/features/places/types';
import CustomText from './custom-text';
import { placeColor } from '@/lib/place';

type Props = {
  place: BasePlace;
};

export default function PlaceText(props: Props) {
  const t = useTranslations();

  const color = placeColor(props.place.x, props.place.y);

  const world = t(`worlds.${props.place.world}`);

  const value = `${world} ${props.place.x} ${props.place.y}`;

  return (
    <div>
      <CustomText value={props.place.name} />
      <CustomText color={color} value={value} />
    </div>
  );
}
