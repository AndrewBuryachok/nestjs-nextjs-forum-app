'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Input, NumberInput } from '@chakra-ui/react';
import { createFineAction } from '../actions';
import { createFineSchema, CreateFineType } from '../schema';
import { useSelectAllUsers } from '@/features/users/hooks';
import { useSelectUserCards } from '@/features/cards/hooks';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';
import UsersCombobox from '@/features/users/components/users-combobox';
import CardsCombobox from '@/features/cards/components/cards-combobox';

export default function CreateFineForm() {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<CreateFineType>({
    resolver: zodResolver(createFineSchema),
    defaultValues: {
      sum: 1,
    },
  });

  const [senderUserId, setSenderUserId] = useState(0);

  useEffect(() => {
    form.setValue('senderCardId', 0);
  }, [senderUserId]);

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await createFineAction({ ...data, senderUserId });
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.fines.create.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.fines.create.failure');
        toaster.error({ title });
      }
    }
  });

  const users = useSelectAllUsers();
  const cards = useSelectUserCards(senderUserId);

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit}>
      <Field.Root required>
        <Field.Label>
          {t('columns.sender')}
          <Field.RequiredIndicator />
        </Field.Label>
        <UsersCombobox
          data={users.data}
          loading={users.isLoading}
          placeholder={t('columns.sender')}
          value={senderUserId}
          setValue={setSenderUserId}
        />
      </Field.Root>
      <Field.Root disabled={!senderUserId} required>
        <Field.Label>
          {t('columns.card')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Controller
          control={form.control}
          name='senderCardId'
          render={({ field }) => (
            <CardsCombobox
              data={cards.data}
              loading={cards.isLoading}
              placeholder={t('columns.card')}
              value={field.value}
              setValue={field.onChange}
            />
          )}
        />
      </Field.Root>
      <Field.Root required>
        <Field.Label>
          {t('columns.receiver')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Controller
          control={form.control}
          name='receiverUserId'
          render={({ field }) => (
            <UsersCombobox
              data={users.data}
              loading={users.isLoading}
              placeholder={t('columns.receiver')}
              value={field.value}
              setValue={field.onChange}
            />
          )}
        />
      </Field.Root>
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
              value={Number.isNaN(field.value) ? '' : String(field.value)}
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
