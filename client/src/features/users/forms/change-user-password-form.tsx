'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field } from '@chakra-ui/react';
import { User } from '../types';
import { changeUserPasswordAction } from '../actions';
import { changeUserPasswordSchema, ChangeUserPasswordType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { PasswordInput } from '@/components/ui/password-input';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  user: User;
};

export default function ChangeUserPasswordForm(props: Props) {
  const t = useTranslations();

  const { closeDialog } = useDialogContext();

  const form = useForm<ChangeUserPasswordType>({
    resolver: zodResolver(changeUserPasswordSchema),
    defaultValues: {
      userId: props.user.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await changeUserPasswordAction(data);
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
      <Field.Root invalid={!!form.formState.errors.password} required>
        <Field.Label>
          {t('columns.password')}
          <Field.RequiredIndicator />
        </Field.Label>
        <PasswordInput
          {...form.register('password')}
          placeholder={t('columns.password')}
        />
        <Field.ErrorText>
          {form.formState.errors.password?.message}
        </Field.ErrorText>
      </Field.Root>
    </CustomForm>
  );
}
