import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import TownsMap from '@/features/towns/components/towns-map';
import { Color } from '@/constants/colors';
import {
  PLACE_X_MAX,
  PLACE_X_MIN,
  PLACE_Y_MAX,
  PLACE_Y_MIN,
} from '@/constants/place';
import { colorToVar } from '@/lib/color';

export async function generateMetadata() {
  const t = await getTranslations();
  return { title: t('pages.map') };
}

export default function Page() {
  const lines = [
    { x: 0, y: PLACE_Y_MAX, color: Color.RED },
    { x: 0, y: PLACE_Y_MIN, color: Color.YELLOW },
    { x: PLACE_X_MAX, y: 0, color: Color.GREEN },
    { x: PLACE_X_MIN, y: 0, color: Color.BLUE },
  ];

  return (
    <Suspense
      fallback={
        <>
          <line
            x1={0}
            y1={PLACE_Y_MIN}
            x2={0}
            y2={PLACE_Y_MAX}
            stroke={colorToVar('gray')}
            strokeWidth={4}
          />
          <line
            x1={PLACE_X_MIN}
            y1={0}
            x2={PLACE_X_MAX}
            y2={0}
            stroke={colorToVar('gray')}
            strokeWidth={4}
          />
          <circle cx={0} cy={0} r={8} fill={colorToVar('gray')} />
        </>
      }
    >
      {lines.map((line) => (
        <line
          key={line.color}
          x1={0}
          y1={0}
          x2={line.x}
          y2={line.y}
          stroke={colorToVar(line.color)}
          strokeWidth={4}
        />
      ))}
      <circle cx={0} cy={0} r={8} fill={colorToVar('purple')} />
      <TownsMap />
    </Suspense>
  );
}
