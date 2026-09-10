'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Input, NumberInput } from '@chakra-ui/react';
import { Fine } from '../types';
import { editMyFineAction, editUserFineAction } from '../actions';
import { editFineSchema, EditFineType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  fine: Fine;
  isAll: boolean;
};

export default function EditFineForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<EditFineType>({
    resolver: zodResolver(editFineSchema),
    defaultValues: {
      fineId: props.fine.id,
      sum: props.fine.sum,
      description: props.fine.description,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await editUserFineAction(data)
      : await editMyFineAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.fines.edit.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.fines.edit.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm
      disabled={form.formState.isSubmitting || !form.formState.isDirty}
      onSubmit={onSubmit}
    >
      <Field.Root invalid={!!form.formState.errors.sum} required>
        <Field.Label>
          {t('columns.sum')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Controller
          control={form.control}
          name='sum'
          render={({ field }) => (
            <NumberInput.Root
              w='full'
              value={String(field.value)}
              onValueChange={(d) => field.onChange(d.valueAsNumber)}
            >
              <NumberInput.Control />
              <NumberInput.Input placeholder={t('columns.sum')} />
            </NumberInput.Root>
          )}
        />
        <Field.ErrorText>{form.formState.errors.sum?.message}</Field.ErrorText>
      </Field.Root>
      <Field.Root invalid={!!form.formState.errors.description}>
        <Field.Label>{t('columns.description')}</Field.Label>
        <Input
          {...form.register('description')}
          placeholder={t('columns.description')}
        />
        <Field.ErrorText>
          {form.formState.errors.description?.message}
        </Field.ErrorText>
      </Field.Root>
    </CustomForm>
  );
}
