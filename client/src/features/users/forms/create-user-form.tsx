'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Input } from '@chakra-ui/react';
import { createUserAction } from '../actions';
import { createUserSchema, CreateUserType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

export default function CreateUserForm() {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<CreateUserType>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await createUserAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.users.create.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.users.create.failure');
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
    </CustomForm>
  );
}
