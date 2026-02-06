import { useTranslations } from 'next-intl';
import { Input } from '@chakra-ui/react';

type Props = {
  value: number;
};

export default function CurrencyInput(props: Props) {
  const t = useTranslations();

  const value = `${props.value} ${t('currency')}`;

  return <Input readOnly value={value} />;
}
