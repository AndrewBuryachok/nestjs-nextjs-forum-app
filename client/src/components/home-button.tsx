'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@chakra-ui/react';
import { useAuthContext } from '@/providers/auth-provider';
import { useDialogContext } from '@/providers/dialog-provider';
import AuthFormWithTabs from '@/features/auth/forms/auth-form-with-tabs';

export default function HomeButton() {
  const t = useTranslations();

  const { user } = useAuthContext();

  const { openDialog } = useDialogContext();

  const openAuthDialog = () =>
    openDialog({ title: t('dialogs.login'), body: <AuthFormWithTabs /> });

  return user ? (
    <Button asChild>
      <Link href={process.env.NEXT_PUBLIC_HOME_URL!} target='_blank'>
        {t('home.button')}
      </Link>
    </Button>
  ) : (
    <Button onClick={openAuthDialog}>{t('home.button')}</Button>
  );
}
