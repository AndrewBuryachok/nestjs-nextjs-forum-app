'use client';

import { useTranslations } from 'next-intl';
import { IconButton, Menu, Portal } from '@chakra-ui/react';
import { LuLogIn, LuLogOut, LuUser } from 'react-icons/lu';
import { useDialogContext } from '@/providers/dialog-provider';
import AuthFormWithTabs from '@/features/auth/forms/auth-form-with-tabs';
import LogoutForm from '@/features/auth/forms/logout-form';

export default function AuthMenu() {
  const t = useTranslations();

  const { openDialog } = useDialogContext();

  return (
    <Menu.Root positioning={{ placement: 'bottom-end' }}>
      <Menu.Trigger asChild cursor='pointer' focusRing='none'>
        <IconButton size='xs' variant='ghost'>
          <LuUser />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content zIndex='sticky'>
            <Menu.Item
              value='login'
              onClick={() =>
                openDialog({
                  title: t('dialogs.auth'),
                  body: <AuthFormWithTabs />,
                })
              }
            >
              <LuLogIn />
              {t('actions.login')}
            </Menu.Item>
            <Menu.Item
              value='logout'
              onClick={() =>
                openDialog({ title: t('dialogs.logout'), body: <LogoutForm /> })
              }
            >
              <LuLogOut />
              {t('actions.logout')}
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
