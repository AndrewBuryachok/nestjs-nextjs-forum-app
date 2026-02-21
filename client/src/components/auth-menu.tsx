'use client';

import { useTranslations } from 'next-intl';
import { IconButton, Menu, Portal } from '@chakra-ui/react';
import { LuLogIn, LuLogOut, LuUser } from 'react-icons/lu';
import { useAuthContext } from '@/providers/auth-provider';
import { useDialogContext } from '@/providers/dialog-provider';
import CustomAvatar from './custom-avatar';
import AuthFormWithTabs from '@/features/auth/forms/auth-form-with-tabs';
import LogoutForm from '@/features/auth/forms/logout-form';

export default function AuthMenu() {
  const t = useTranslations();

  const { user } = useAuthContext();

  const { openDialog } = useDialogContext();

  const openLoginDialog = () =>
    openDialog({ title: t('dialogs.login'), body: <AuthFormWithTabs /> });

  const openLogoutDialog = () =>
    openDialog({ title: t('dialogs.logout'), body: <LogoutForm /> });

  return (
    <Menu.Root positioning={{ placement: 'bottom-end' }}>
      <Menu.Trigger asChild={!user} cursor='pointer' focusRing='none'>
        {!user ? (
          <IconButton size='xs' variant='ghost'>
            <LuUser />
          </IconButton>
        ) : (
          <CustomAvatar user={user} />
        )}
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content zIndex='sticky'>
            {!user ? (
              <Menu.Item value='login' onClick={openLoginDialog}>
                <LuLogIn />
                {t('dialogs.login')}
              </Menu.Item>
            ) : (
              <Menu.Item value='logout' onClick={openLogoutDialog}>
                <LuLogOut />
                {t('dialogs.logout')}
              </Menu.Item>
            )}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
