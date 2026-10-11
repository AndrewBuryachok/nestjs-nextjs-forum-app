import { useTranslations } from 'next-intl';
import CustomText from './custom-text';
import { Unit } from '@/constants/units';

type Props = {
  amount: number;
  unit: Unit;
};

export default function AmountText(props: Props) {
  const t = useTranslations();

  const value = `${props.amount} ${t(`units.${props.unit}`)}`;

  return <CustomText value={value} />;
}
