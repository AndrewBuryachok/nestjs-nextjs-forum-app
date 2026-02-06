import { useTranslations } from 'next-intl';
import { HStack } from '@chakra-ui/react';
import BankIcon from './bank-icon';
import CustomText from './custom-text';

export default function BankIconWithText() {
  const t = useTranslations();

  return (
    <HStack>
      <BankIcon />
      <CustomText value={t('bank')} />
    </HStack>
  );
}
