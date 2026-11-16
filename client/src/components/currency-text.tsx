import { useTranslations } from 'next-intl';
import CustomText from './custom-text';
import { Color } from '@/constants/colors';

type Props = {
  isFrom?: boolean;
  isTo?: boolean;
  value: number;
};

export default function CurrencyText(props: Props) {
  const t = useTranslations();

  const color =
    props.isFrom && !props.isTo
      ? Color.RED
      : !props.isFrom && props.isTo
        ? Color.GREEN
        : undefined;

  const char =
    props.isFrom && !props.isTo ? '-' : !props.isFrom && props.isTo ? '+' : '';

  const value = `${char}${props.value} ${t('currency')}`;

  return <CustomText big bold color={color} value={value} />;
}
