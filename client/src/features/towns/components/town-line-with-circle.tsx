'use client';

import { useTranslations } from 'next-intl';
import { Town, TownChunk } from '../types';
import { useDialogContext } from '@/providers/dialog-provider';
import ViewTownForm from '../forms/view-town-form';
import { chunkPath } from '@/lib/chunk';
import { colorToVar } from '@/lib/color';
import { placeColor } from '@/lib/place';

type Props = {
  town: Town;
  chunks: TownChunk[];
};

export default function TownLineWithCircle(props: Props) {
  const t = useTranslations();

  const { openDialog } = useDialogContext();

  const { fill, outline } = chunkPath(props.chunks);

  const color = colorToVar(placeColor(props.town.x, props.town.y));

  const vertical = Math.abs(props.town.x) < Math.abs(props.town.y);

  const onClick = () =>
    openDialog({
      title: t('actions.view') + ' ' + t('dialogs.town'),
      body: <ViewTownForm town={props.town} />,
    });

  return (
    <g style={{ cursor: 'pointer' }} onClick={onClick}>
      <path d={fill} fill={color} fillOpacity={0.2} />
      <path d={outline} fill='none' stroke={color} strokeWidth='2' />
      <line
        x1={props.town.x}
        y1={props.town.y}
        x2={vertical ? 0 : props.town.x}
        y2={vertical ? props.town.y : 0}
        stroke={color}
        strokeWidth={4}
      />
      <circle cx={props.town.x} cy={props.town.y} r={8} fill={color} />
    </g>
  );
}
