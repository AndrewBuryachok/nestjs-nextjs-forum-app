'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Input, NumberInput } from '@chakra-ui/react';
import {
  createMyTransferTransactionAction,
  createUserTransferTransactionAction,
} from '../actions';
import { createTransferSchema, CreateTransferType } from '../schema';
import { useSelectAllUsers } from '@/features/users/hooks';
import {
  useSelectMyCards,
  useSelectUserCards,
  useSelectUserCardsWithBalance,
} from '@/features/cards/hooks';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';
import UsersCombobox from '@/features/users/components/users-combobox';
import CardsWithBalanceCombobox from '@/features/cards/components/cards-with-balance-combobox';
import CardsCombobox from '@/features/cards/components/cards-combobox';

type Props = {
  isAll: boolean;
};

export default function CreateTransferForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<CreateTransferType>({
    resolver: zodResolver(createTransferSchema),
  });

  const [senderUserId, setSenderUserId] = useState(0);
  const [receiverUserId, setReceiverUserId] = useState(0);

  useEffect(() => {
    form.setValue('senderCardId', 0);
  }, [senderUserId]);

  useEffect(() => {
    form.setValue('receiverCardId', 0);
  }, [receiverUserId]);

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await createUserTransferTransactionAction(data)
      : await createMyTransferTransactionAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.transfers.create.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.transfers.create.failure');
        toaster.error({ title });
      }
    }
  });

  const users = useSelectAllUsers();
  const senderCards = props.isAll
    ? useSelectUserCardsWithBalance(senderUserId)
    : useSelectMyCards();
  const receiverCards = useSelectUserCards(receiverUserId);

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
              data={senderCards.data}
              loading={senderCards.isLoading}
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
        <UsersCombobox
          data={users.data}
          loading={users.isLoading}
          placeholder={t('columns.receiver')}
          value={receiverUserId}
          setValue={setReceiverUserId}
        />
      </Field.Root>
      <Field.Root disabled={!receiverUserId} required>
        <Field.Label>
          {t('columns.card')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Controller
          control={form.control}
          name='receiverCardId'
          render={({ field }) => (
            <CardsCombobox
              data={receiverCards.data}
              loading={receiverCards.isLoading}
              placeholder={t('columns.card')}
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
        <NumberInput.Root w='full'>
          <NumberInput.Control />
          <NumberInput.Input
            {...form.register('sum', { valueAsNumber: true })}
            placeholder={t('columns.sum')}
          />
        </NumberInput.Root>
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
