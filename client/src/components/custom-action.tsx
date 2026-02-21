'use client';

import { useTranslations } from 'next-intl';
import { IconButton } from '@chakra-ui/react';
import { LuPlus } from 'react-icons/lu';
import { useAuthContext } from '@/providers/auth-provider';
import { useDialogContext } from '@/providers/dialog-provider';
import AuthFormWithTabs from '@/features/auth/forms/auth-form-with-tabs';

type Props = {
  action: string;
  dialog: string;
  body: React.ReactNode;
};

export default function CustomAction(props: Props) {
  const t = useTranslations();

  const { user } = useAuthContext();

  const { openDialog } = useDialogContext();

  const openActionDialog = () =>
    openDialog({
      title: t(`actions.${props.action}`) + ' ' + t(`dialogs.${props.dialog}`),
      body: props.body,
    });

  const openAuthDialog = () =>
    openDialog({ title: t('dialogs.auth'), body: <AuthFormWithTabs /> });

  return (
    <IconButton
      size='xs'
      variant='ghost'
      onClick={user ? openActionDialog : openAuthDialog}
    >
      <LuPlus />
    </IconButton>
  );
}
