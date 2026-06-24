'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Input } from '@chakra-ui/react';
import { User } from '../types';
import { editUserProfileAction } from '../actions';
import { editUserProfileSchema, EditUserProfileType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  user: User;
};

export default function EditUserProfileForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<EditUserProfileType>({
    resolver: zodResolver(editUserProfileSchema),
    defaultValues: {
      userId: props.user.id,
      avatar: props.user.avatar,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await editUserProfileAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.users.editProfile.success');
        toaster.success({ title });
        router.refresh();
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
