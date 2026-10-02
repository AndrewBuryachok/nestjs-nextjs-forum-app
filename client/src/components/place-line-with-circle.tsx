'use client';

import { useTranslations } from 'next-intl';
import { Shop } from '@/features/shops/types';
import { Locker } from '@/features/lockers/types';
import { useDialogContext } from '@/providers/dialog-provider';
import ViewPlaceForm from '@/features/places/forms/view-place-form';
import { placeColor } from '@/lib/place';
import { colorToVar } from '@/lib/color';
import {
  PLACE_X_MAX,
  PLACE_X_MIN,
  PLACE_Y_MAX,
  PLACE_Y_MIN,
} from '@/constants/place';

type Props = {
  place: Shop | Locker;
  type: 'shop' | 'locker';
};

export default function PlaceLineWithCircle(props: Props) {
  const t = useTranslations();

  const { openDialog } = useDialogContext();

  const x1 = `${((props.place.x - PLACE_X_MIN) * 100) / (PLACE_X_MAX - PLACE_X_MIN)}%`;
  const y1 = `${((props.place.y - PLACE_Y_MIN) * 100) / (PLACE_Y_MAX - PLACE_Y_MIN)}%`;
  const vertical = Math.abs(props.place.x) < Math.abs(props.place.y);
  const x2 = vertical ? '50%' : x1;
  const y2 = vertical ? y1 : '50%';
  const color = placeColor(props.place.x, props.place.y);

  const onClick = () =>
    openDialog({
      title: t('actions.view') + ' ' + t(`dialogs.${props.type}`),
      body: <ViewPlaceForm place={props.place} type={props.type} />,
    });

  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={colorToVar(color)} />
      <circle
        cx={x1}
        cy={y1}
        r='4'
        fill={colorToVar(color)}
        style={{ cursor: 'pointer' }}
        onClick={onClick}
      >
        <title>{props.place.name}</title>
      </circle>
    </g>
  );
}
