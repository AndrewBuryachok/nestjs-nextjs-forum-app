import { useTranslations } from 'next-intl';
import { HStack, Square } from '@chakra-ui/react';
import { LuLandmark } from 'react-icons/lu';
import CustomText from './custom-text';

export default function BankIconWithText() {
  const t = useTranslations();

  return (
    <HStack>
      <Square bg='bg.muted' borderRadius='sm' size='8'>
        <LuLandmark />
      </Square>
      <CustomText value={t('bank')} />
    </HStack>
  );
}
