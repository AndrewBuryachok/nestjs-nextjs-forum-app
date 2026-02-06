'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@chakra-ui/react';
import { useDialogContext } from '@/providers/dialog-provider';

export default function CloseDialogButton() {
  const t = useTranslations();

  const { closeDialog } = useDialogContext();

  return <Button onClick={closeDialog}>{t('buttons.close')}</Button>;
}
