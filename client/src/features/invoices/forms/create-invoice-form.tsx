'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Input, NumberInput } from '@chakra-ui/react';
import { createMyInvoiceAction, createUserInvoiceAction } from '../actions';
import { createInvoiceSchema, CreateInvoiceType } from '../schema';
import { useSelectAllUsers } from '@/features/users/hooks';
import {
  useSelectMyCards,
  useSelectUserCardsWithBalance,
} from '@/features/cards/hooks';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';
import UsersCombobox from '@/features/users/components/users-combobox';
import CardsWithBalanceCombobox from '@/features/cards/components/cards-with-balance-combobox';

type Props = {
  isAll: boolean;
};

export default function CreateInvoiceForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<CreateInvoiceType>({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues: {
      sum: 1,
    },
  });

  const [senderUserId, setSenderUserId] = useState(0);

  useEffect(() => {
    form.setValue('senderCardId', 0);
  }, [senderUserId]);

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await createUserInvoiceAction({ ...data, senderUserId })
      : await createMyInvoiceAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.invoices.create.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.invoices.create.failure');
        toaster.error({ title });
      }
    }
  });

  const users = useSelectAllUsers();
  const cards = props.isAll
    ? useSelectUserCardsWithBalance(senderUserId)
    : useSelectMyCards();

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit}>
      {props.isAll && (
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
      )}
      <Field.Root disabled={props.isAll && !senderUserId} required>
        <Field.Label>
          {t('columns.card')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Controller
          control={form.control}
          name='senderCardId'
          render={({ field }) => (
            <CardsWithBalanceCombobox
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
