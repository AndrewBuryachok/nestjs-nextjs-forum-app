'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Input } from '@chakra-ui/react';
import { loginAction, registerAction } from '../actions';
import { authSchema, AuthType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { PasswordInput } from '@/components/ui/password-input';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  isLogin: boolean;
};

export default function AuthForm(props: Props) {
  const t = useTranslations();

  const { closeDialog } = useDialogContext();

  const form = useForm<AuthType>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isLogin
      ? await loginAction(data)
      : await registerAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = props.isLogin
          ? t('toasts.auth.login.success')
          : t('toasts.auth.register.success');
        toaster.success({ title });
        closeDialog();
      } else {
        const title =
          res.data.message ??
          (props.isLogin
            ? t('toasts.auth.login.failure')
            : t('toasts.auth.register.failure'));
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit}>
      <Field.Root invalid={!!form.formState.errors.nick} required>
        <Field.Label>
          {t('columns.nick')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Input {...form.register('nick')} placeholder={t('columns.nick')} />
        <Field.ErrorText>{form.formState.errors.nick?.message}</Field.ErrorText>
      </Field.Root>
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
