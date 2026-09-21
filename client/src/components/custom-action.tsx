'use client';

import { useTranslations } from 'next-intl';
import { IconButton } from '@chakra-ui/react';
import { LuPlus } from 'react-icons/lu';
import { useAuthContext } from '@/providers/auth-provider';
import { useDialogContext } from '@/providers/dialog-provider';
import AuthFormWithTabs from '@/features/auth/forms/auth-form-with-tabs';
import { Role } from '@/constants/roles';

type Props = {
  action: string;
  dialog: string;
  role?: Role;
  icon?: React.ReactNode;
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
    openDialog({ title: t('dialogs.login'), body: <AuthFormWithTabs /> });

  return (
    <IconButton
      disabled={!!props.role && !user?.roles.includes(props.role)}
      onClick={user ? openActionDialog : openAuthDialog}
    >
      {props.icon ?? <LuPlus />}
    </IconButton>
  );
}
