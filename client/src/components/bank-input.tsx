import { useTranslations } from 'next-intl';
import { Input, InputGroup } from '@chakra-ui/react';
import BankIcon from './bank-icon';

export default function BankInput() {
  const t = useTranslations();

  return (
    <InputGroup startAddon={<BankIcon />}>
      <Input readOnly value={t('bank')} />
    </InputGroup>
  );
}
