import { useTranslations } from 'next-intl';
import CustomText from './custom-text';
import { Unit } from '@/constants/units';

type Props = {
  value: [number, number, Unit];
};

export default function AmountText(props: Props) {
  const t = useTranslations();

  const value = `${props.value[0]} * ${props.value[1]} ${t(`units.${props.value[2]}`)}`;

  return <CustomText value={value} />;
}
