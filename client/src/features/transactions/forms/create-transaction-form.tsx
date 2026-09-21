'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, NumberInput, SegmentGroup } from '@chakra-ui/react';
import {
  createDepositTransactionAction,
  createWithdrawTransactionAction,
} from '../actions';
import { createTransactionSchema, CreateTransactionType } from '../schema';
import { useSelectAllUsers } from '@/features/users/hooks';
import { useSelectUserCardsWithBalance } from '@/features/cards/hooks';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';
import UsersCombobox from '@/features/users/components/users-combobox';
import CardsWithBalanceCombobox from '@/features/cards/components/cards-with-balance-combobox';

export default function CreateTransactionForm() {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<CreateTransactionType>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      sum: 1,
    },
  });

  const types = ['deposit', 'withdraw'];
  const [type, setType] = useState(true);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    form.setValue('cardId', 0);
  }, [userId]);

  const onSubmit = form.handleSubmit(async (data) => {
    const res = type
      ? await createDepositTransactionAction({ ...data, userId })
      : await createWithdrawTransactionAction({ ...data, userId });
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.transactions.create.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title =
          res.data.message ?? t('toasts.transactions.create.failure');
        toaster.error({ title });
      }
    }
  });

  const users = useSelectAllUsers();
  const cards = useSelectUserCardsWithBalance(userId);

  const card = cards.data?.find((card) => card.id === form.watch('cardId'));
  const notEnoughBalance = !type && card && card.balance < form.watch('sum');

  return (
    <CustomForm
      disabled={form.formState.isSubmitting || !!notEnoughBalance}
      onSubmit={onSubmit}
    >
      <SegmentGroup.Root
        w='full'
        value={types[Number(!type)]}
        onValueChange={({ value }) => value && setType(!types.indexOf(value))}
      >
        <SegmentGroup.Indicator />
        <SegmentGroup.Items
          w='full'
          items={types.map((type) => ({
            value: type,
            label: t(`actions.${type}`),
          }))}
        />
      </SegmentGroup.Root>
      <Field.Root required>
        <Field.Label>
          {t('columns.user')}
          <Field.RequiredIndicator />
        </Field.Label>
        <UsersCombobox
          data={users.data}
          loading={users.isLoading}
          placeholder={t('columns.user')}
          value={userId}
          setValue={setUserId}
        />
      </Field.Root>
      <Field.Root disabled={!userId} invalid={notEnoughBalance} required>
        <Field.Label>
          {t('columns.card')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Controller
          control={form.control}
          name='cardId'
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
        <Field.ErrorText>
          {notEnoughBalance && t('errors.not_enough_balance')}
        </Field.ErrorText>
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
    </CustomForm>
  );
}
