import { useTranslations } from 'next-intl';
import { Badge } from '@chakra-ui/react';
import { Unit } from '@/constants/units';

type Props = {
  amount: number;
  unit: Unit;
};

export default function AmountBadge(props: Props) {
  const t = useTranslations();

  const value = `${props.amount} ${t(`units.${props.unit}`)}`;

  return <Badge>{value}</Badge>;
}
