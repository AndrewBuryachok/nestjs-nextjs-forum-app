import { useTranslations } from 'next-intl';
import { Input } from '@chakra-ui/react';
import { Unit } from '@/constants/units';

type Props = {
  value: [number, number, Unit];
};

export default function AmountInput(props: Props) {
  const t = useTranslations();

  const value = `${props.value[0]} * ${props.value[1]} ${t(`units.${props.value[2]}`)}`;

  return <Input readOnly value={value} />;
}
