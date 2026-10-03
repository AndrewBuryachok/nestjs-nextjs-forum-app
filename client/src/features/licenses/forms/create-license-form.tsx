'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field } from '@chakra-ui/react';
import { createLicenseAction } from '../actions';
import { updateLicenseSchema, UpdateLicenseType } from '../schema';
import { useSelectAllUsers } from '@/features/users/hooks';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';
import UsersCombobox from '@/features/users/components/users-combobox';

export default function GiveLicenseForm() {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<UpdateLicenseType>({
    resolver: zodResolver(updateLicenseSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await createLicenseAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.licenses.create.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.licenses.create.failure');
        toaster.error({ title });
      }
    }
  });

  const users = useSelectAllUsers();

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit}>
      <Field.Root required>
        <Field.Label>
          {t('columns.user')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Controller
          control={form.control}
          name='userId'
          render={({ field }) => (
            <UsersCombobox
              data={users.data}
              loading={users.isLoading}
              placeholder={t('columns.user')}
              value={field.value}
              setValue={field.onChange}
            />
          )}
        />
      </Field.Root>
    </CustomForm>
  );
}
