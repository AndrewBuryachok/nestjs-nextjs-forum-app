'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { logoutAction } from '../actions';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

export default function LogoutForm() {
  const t = useTranslations();

  const { closeDialog } = useDialogContext();

  const form = useForm();

  const onSubmit = form.handleSubmit(async () => {
    const res = await logoutAction();
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.auth.logout.success');
        toaster.success({ title });
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.auth.logout.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit} />
  );
}
