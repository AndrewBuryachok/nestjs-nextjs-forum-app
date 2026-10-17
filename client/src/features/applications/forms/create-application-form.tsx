'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field } from '@chakra-ui/react';
import { createApplicationAction } from '../actions';
import { createApplicationSchema, CreateApplicationType } from '../schema';
import { useSelectAllTowns } from '@/features/towns/hooks';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';
import TownsCombobox from '@/features/towns/components/towns-combobox';

export default function CreateApplicationForm() {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<CreateApplicationType>({
    resolver: zodResolver(createApplicationSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await createApplicationAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.applications.create.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title =
          res.data.message ?? t('toasts.applications.create.failure');
        toaster.error({ title });
      }
    }
  });

  const towns = useSelectAllTowns();

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit}>
      <Field.Root required>
        <Field.Label>
          {t('columns.town')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Controller
          control={form.control}
          name='townId'
          render={({ field }) => (
            <TownsCombobox
              data={towns.data}
              loading={towns.isLoading}
              placeholder={t('columns.town')}
              value={field.value}
              setValue={field.onChange}
            />
          )}
        />
      </Field.Root>
    </CustomForm>
  );
}
