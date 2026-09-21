'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Input, NumberInput } from '@chakra-ui/react';
import { Landmark } from '../types';
import { editMyLandmarkAction, editUserLandmarkAction } from '../actions';
import { editLandmarkSchema, EditLandmarkType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  landmark: Landmark;
  isAll: boolean;
};

export default function EditLandmarkForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<EditLandmarkType>({
    resolver: zodResolver(editLandmarkSchema),
    defaultValues: {
      landmarkId: props.landmark.id,
      name: props.landmark.name,
      x: props.landmark.x,
      y: props.landmark.y,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await editUserLandmarkAction(data)
      : await editMyLandmarkAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.landmarks.edit.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.landmarks.edit.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm
      disabled={form.formState.isSubmitting || !form.formState.isDirty}
      onSubmit={onSubmit}
    >
      <Field.Root invalid={!!form.formState.errors.name} required>
        <Field.Label>
          {t('columns.name')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Input {...form.register('name')} placeholder={t('columns.name')} />
        <Field.ErrorText>{form.formState.errors.name?.message}</Field.ErrorText>
      </Field.Root>
      <Field.Root invalid={!!form.formState.errors.x} required>
        <Field.Label>
          {t('columns.x')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Controller
          control={form.control}
          name='x'
          render={({ field }) => (
            <NumberInput.Root
              w='full'
              value={Number.isNaN(field.value) ? '' : String(field.value)}
              onValueChange={(d) => field.onChange(d.valueAsNumber)}
            >
              <NumberInput.Control />
              <NumberInput.Input placeholder={t('columns.x')} />
            </NumberInput.Root>
          )}
        />
        <Field.ErrorText>{form.formState.errors.x?.message}</Field.ErrorText>
      </Field.Root>
      <Field.Root invalid={!!form.formState.errors.y} required>
        <Field.Label>
          {t('columns.y')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Controller
          control={form.control}
          name='y'
          render={({ field }) => (
            <NumberInput.Root
              w='full'
              value={Number.isNaN(field.value) ? '' : String(field.value)}
              onValueChange={(d) => field.onChange(d.valueAsNumber)}
            >
              <NumberInput.Control />
              <NumberInput.Input placeholder={t('columns.y')} />
            </NumberInput.Root>
          )}
        />
        <Field.ErrorText>{form.formState.errors.y?.message}</Field.ErrorText>
      </Field.Root>
    </CustomForm>
  );
}
