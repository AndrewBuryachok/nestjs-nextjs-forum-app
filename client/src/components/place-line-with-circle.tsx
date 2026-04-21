'use client';

import { useTranslations } from 'next-intl';
import { Shop } from '@/features/shops/types';
import { Locker } from '@/features/lockers/types';
import { useDialogContext } from '@/providers/dialog-provider';
import ViewPlaceForm from '@/features/places/forms/view-place-form';
import { Color } from '@/constants/colors';
import { colorToVar } from '@/lib/color';

type Props = {
  place: Shop | Locker;
  type: 'shop' | 'locker';
};

export default function PlaceLineWithCircle(props: Props) {
  const t = useTranslations();

  const { openDialog } = useDialogContext();

  const x1 = `${(props.place.x + 1000) / 20}%`;
  const y1 = `${100 - (props.place.y + 1000) / 20}%`;
  const vertical = Math.abs(props.place.x) < Math.abs(props.place.y);
  const x2 = vertical ? '50%' : x1;
  const y2 = vertical ? y1 : '50%';
  const color = vertical
    ? props.place.y > 0
      ? Color.RED
      : Color.YELLOW
    : props.place.x > 0
      ? Color.GREEN
      : Color.BLUE;

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
