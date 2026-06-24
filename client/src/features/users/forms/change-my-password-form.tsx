'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field } from '@chakra-ui/react';
import { changeMyPasswordAction } from '../actions';
import { changeMyPasswordSchema, ChangeMyPasswordType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { PasswordInput } from '@/components/ui/password-input';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

export default function ChangeMyPasswordForm() {
  const t = useTranslations();

  const { closeDialog } = useDialogContext();

  const form = useForm<ChangeMyPasswordType>({
    resolver: zodResolver(changeMyPasswordSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await changeMyPasswordAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.users.changePassword.success');
        toaster.success({ title });
        closeDialog();
      } else {
        const title =
          res.data.message ?? t('toasts.users.changePassword.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit}>
      <Field.Root invalid={!!form.formState.errors.oldPassword} required>
        <Field.Label>
          {t('columns.oldPassword')}
          <Field.RequiredIndicator />
        </Field.Label>
        <PasswordInput
          {...form.register('oldPassword')}
          placeholder={t('columns.oldPassword')}
        />
        <Field.ErrorText>
          {form.formState.errors.oldPassword?.message}
        </Field.ErrorText>
      </Field.Root>
      <Field.Root invalid={!!form.formState.errors.newPassword} required>
        <Field.Label>
          {t('columns.newPassword')}
          <Field.RequiredIndicator />
        </Field.Label>
        <PasswordInput
          {...form.register('newPassword')}
          placeholder={t('columns.newPassword')}
        />
        <Field.ErrorText>
          {form.formState.errors.newPassword?.message}
        </Field.ErrorText>
      </Field.Root>
    </CustomForm>
  );
}
