'use client';

import { useTranslations } from 'next-intl';
import { Town } from '@/features/towns/types';
import { useDialogContext } from '@/providers/dialog-provider';
import ViewTownForm from '@/features/towns/forms/view-town-form';
import { placeColor } from '@/lib/place';
import { colorToVar } from '@/lib/color';
import {
  PLACE_X_MAX,
  PLACE_X_MIN,
  PLACE_Y_MAX,
  PLACE_Y_MIN,
} from '@/constants/place';

type Props = {
  town: Town;
};

export default function PlaceLineWithCircle(props: Props) {
  const t = useTranslations();

  const { openDialog } = useDialogContext();

  const x1 = `${((props.town.x - PLACE_X_MIN) * 100) / (PLACE_X_MAX - PLACE_X_MIN)}%`;
  const y1 = `${((props.town.y - PLACE_Y_MIN) * 100) / (PLACE_Y_MAX - PLACE_Y_MIN)}%`;
  const vertical = Math.abs(props.town.x) < Math.abs(props.town.y);
  const x2 = vertical ? '50%' : x1;
  const y2 = vertical ? y1 : '50%';
  const color = placeColor(props.town.x, props.town.y);

  const onClick = () =>
    openDialog({
      title: t('actions.view') + ' ' + t('dialogs.town'),
      body: <ViewTownForm town={props.town} />,
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
        <title>{props.town.name}</title>
      </circle>
    </g>
  );
}
