'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Input } from '@chakra-ui/react';
import { Town } from '../types';
import { editMyTownAction, editUserTownAction } from '../actions';
import { editTownSchema, EditTownType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  town: Town;
  isAll: boolean;
};

export default function EditTownForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<EditTownType>({
    resolver: zodResolver(editTownSchema),
    defaultValues: {
      townId: props.town.id,
      name: props.town.name,
      x: props.town.x,
      y: props.town.y,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await editUserTownAction(data)
      : await editMyTownAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.towns.edit.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.towns.edit.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm
      disabled={!form.formState.isDirty}
      loading={form.formState.isSubmitting}
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
        <Input
          {...form.register('x', { valueAsNumber: true })}
          placeholder={t('columns.x')}
          type='number'
        />
        <Field.ErrorText>{form.formState.errors.x?.message}</Field.ErrorText>
      </Field.Root>
      <Field.Root invalid={!!form.formState.errors.y} required>
        <Field.Label>
          {t('columns.y')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Input
          {...form.register('y', { valueAsNumber: true })}
          placeholder={t('columns.y')}
          type='number'
        />
        <Field.ErrorText>{form.formState.errors.y?.message}</Field.ErrorText>
      </Field.Root>
    </CustomForm>
  );
}
