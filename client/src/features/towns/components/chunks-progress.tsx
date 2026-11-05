import { useTranslations } from 'next-intl';
import CustomProgress from '@/components/custom-progress';

type Props = {
  level: number;
  chunks: number;
};

export default function ChunksProgress(props: Props) {
  const t = useTranslations();

  const max = Number(
    process.env.NEXT_PUBLIC_MAX_TOWN_CHUNKS!.split(',')[props.level - 1],
  );

  return (
    <CustomProgress
      value={props.chunks}
      max={max}
      label1={t('columns.chunks')}
    />
  );
}
