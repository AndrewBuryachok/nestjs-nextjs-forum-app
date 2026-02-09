'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, NumberInput } from '@chakra-ui/react';
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

type Props = {
  type: boolean;
};

export default function CreateTransactionForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<CreateTransactionType>({
    resolver: zodResolver(createTransactionSchema),
  });

  const [userId, setUserId] = useState(0);

  useEffect(() => {
    form.setValue('cardId', 0);
  }, [userId]);

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.type
      ? await createDepositTransactionAction(data)
      : await createWithdrawTransactionAction(data);
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

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit}>
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
      <Field.Root disabled={!userId} required>
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
    </CustomForm>
  );
}
