import { useTranslations } from 'next-intl';
import { Input } from '@chakra-ui/react';
import { Unit } from '@/constants/units';

type Props = {
  amount: number;
  unit: Unit;
};

export default function AmountInput(props: Props) {
  const t = useTranslations();

  const value = `${props.amount} ${t(`units.${props.unit}`)}`;

  return <Input readOnly value={value} />;
}
