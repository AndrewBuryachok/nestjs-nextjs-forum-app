'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, NumberInput } from '@chakra-ui/react';
import { Town } from '../types';
import { addMyTownChunkAction, addUserTownChunkAction } from '../actions';
import { updateTownChunkSchema, UpdateTownChunkType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  town: Town;
  isAll: boolean;
};

export default function AddTownChunkForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<UpdateTownChunkType>({
    resolver: zodResolver(updateTownChunkSchema),
    defaultValues: {
      townId: props.town.id,
      x: 0,
      y: 0,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await addUserTownChunkAction(data)
      : await addMyTownChunkAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.towns.addChunk.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.towns.addChunk.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit}>
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
              value={String(field.value)}
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
              value={String(field.value)}
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
