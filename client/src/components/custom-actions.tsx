'use client';

import { useTranslations } from 'next-intl';
import { ButtonGroup, IconButton } from '@chakra-ui/react';
import { useAuthContext } from '@/providers/auth-provider';
import { useDialogContext } from '@/providers/dialog-provider';
import AuthFormWithTabs from '@/features/auth/forms/auth-form-with-tabs';
import { Color } from '@/constants/colors';

type Props = {
  actions: {
    action: string;
    dialog: string;
    color?: Color;
    disabled?: boolean;
    userId?: number;
    icon: React.ReactNode;
    body: React.ReactNode;
  }[];
};

export default function CustomActions(props: Props) {
  const t = useTranslations();

  const { user } = useAuthContext();

  const { openDialog } = useDialogContext();

  const openActionDialog = props.actions.map(
    (action) => () =>
      openDialog({
        title:
          t(`actions.${action.action}`) + ' ' + t(`dialogs.${action.dialog}`),
        body: action.body,
      }),
  );

  const openAuthDialog = () =>
    openDialog({ title: t('dialogs.auth'), body: <AuthFormWithTabs /> });

  return (
    <ButtonGroup attached size='2xs' variant='plain'>
      {props.actions.map((action, index) => (
        <IconButton
          key={action.action}
          colorPalette={action.color}
          disabled={
            action.disabled || (!!action.userId && action.userId !== user?.id)
          }
          onClick={
            user || action.color === Color.BLUE
              ? openActionDialog[index]
              : openAuthDialog
          }
        >
          {action.icon}
        </IconButton>
      ))}
    </ButtonGroup>
  );
}
