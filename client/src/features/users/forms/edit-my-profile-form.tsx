'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Input } from '@chakra-ui/react';
import { editMyProfileAction } from '../actions';
import { editMyProfileSchema, EditMyProfileType } from '../schema';
import { useAuthContext } from '@/providers/auth-provider';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

export default function EditMyProfileForm() {
  const t = useTranslations();

  const { user } = useAuthContext();

  const { closeDialog } = useDialogContext();

  const form = useForm<EditMyProfileType>({
    resolver: zodResolver(editMyProfileSchema),
    defaultValues: {
      avatar: user!.avatar,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await editMyProfileAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.users.editProfile.success');
        toaster.success({ title });
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.users.editProfile.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm
      disabled={form.formState.isSubmitting || !form.formState.isDirty}
      onSubmit={onSubmit}
    >
      <Field.Root invalid={!!form.formState.errors.avatar}>
        <Field.Label>{t('columns.avatar')}</Field.Label>
        <Input {...form.register('avatar')} placeholder={t('columns.avatar')} />
        <Field.ErrorText>
          {form.formState.errors.avatar?.message}
        </Field.ErrorText>
      </Field.Root>
    </CustomForm>
  );
}
