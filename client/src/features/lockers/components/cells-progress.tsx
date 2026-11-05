import { useTranslations } from 'next-intl';
import CustomProgress from '@/components/custom-progress';

type Props = {
  cells: number;
  orders: number;
};

export default function CellsProgress(props: Props) {
  const t = useTranslations();

  return (
    <CustomProgress
      value={props.cells - props.orders}
      max={props.cells}
      label1={t('columns.cells')}
    />
  );
}
