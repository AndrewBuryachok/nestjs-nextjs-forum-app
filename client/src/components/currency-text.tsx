import { useTranslations } from 'next-intl';
import CustomText from './custom-text';

type Props = {
  value: number;
};

export default function CurrencyText(props: Props) {
  const t = useTranslations();

  const value = `${props.value} ${t('currency')}`;

  return <CustomText value={value} />;
}
