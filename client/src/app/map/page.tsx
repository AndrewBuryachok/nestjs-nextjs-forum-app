import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import SvgLayout from '@/components/svg-layout';
import CustomMap from '@/components/custom-map';
import { Color } from '@/constants/colors';
import { colorToVar } from '@/lib/color';

export async function generateMetadata() {
  const t = await getTranslations();
  return { title: t('pages.map') };
}

export default function Page() {
  const lines = [
    { x: '50%', y: '0%', color: Color.RED },
    { x: '50%', y: '100%', color: Color.YELLOW },
    { x: '100%', y: '50%', color: Color.GREEN },
    { x: '0%', y: '50%', color: Color.BLUE },
  ];

  return (
    <SvgLayout>
      {lines.map((line) => (
        <line
          key={line.color}
          x1='50%'
          y1='50%'
          x2={line.x}
          y2={line.y}
          stroke={colorToVar(line.color)}
        />
      ))}
      <circle cx='50%' cy='50%' r='8' fill={colorToVar('purple')} />
      <Suspense fallback={null}>
        <CustomMap />
      </Suspense>
    </SvgLayout>
  );
}
