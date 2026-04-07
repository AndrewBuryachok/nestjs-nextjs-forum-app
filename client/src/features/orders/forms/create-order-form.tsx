'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Input, NumberInput } from '@chakra-ui/react';
import { createMyOrderAction, createUserOrderAction } from '../actions';
import { createOrderSchema, CreateOrderType } from '../schema';
import { useSelectAllUsers } from '@/features/users/hooks';
import {
  useSelectMyCards,
  useSelectUserCardsWithBalance,
} from '@/features/cards/hooks';
import { useSelectAllLockers } from '@/features/lockers/hooks';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';
import UsersCombobox from '@/features/users/components/users-combobox';
import CardsWithBalanceCombobox from '@/features/cards/components/cards-with-balance-combobox';
import LockersCombobox from '@/features/lockers/components/lockers-combobox';
import ItemsCombobox from '@/components/items-combobox';
import UnitsSegmentGroup from '@/components/units-segment-group';

type Props = {
  isAll: boolean;
};

export default function CreateOrderForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<CreateOrderType>({
    resolver: zodResolver(createOrderSchema),
  });

  const [userId, setUserId] = useState(0);

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await createUserOrderAction(data)
      : await createMyOrderAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.orders.create.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.orders.create.failure');
        toaster.error({ title });
      }
    }
  });

  const users = useSelectAllUsers(props.isAll);
  const cards = props.isAll
    ? useSelectUserCardsWithBalance(userId)
    : useSelectMyCards();
  const lockers = useSelectAllLockers();

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit}>
      {props.isAll && (
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
      )}
      <Field.Root disabled={props.isAll && !userId} required>
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
      <Field.Root disabled={props.isAll && !userId} required>
        <Field.Label>
          {t('columns.locker')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Controller
          control={form.control}
          name='lockerId'
          render={({ field }) => (
            <LockersCombobox
              data={lockers.data}
              loading={lockers.isLoading}
              placeholder={t('columns.locker')}
              value={field.value}
              setValue={field.onChange}
            />
          )}
        />
      </Field.Root>
      <Field.Root required>
        <Field.Label>
          {t('columns.item')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Controller
          control={form.control}
          name='item'
          render={({ field }) => (
            <ItemsCombobox value={field.value} setValue={field.onChange} />
          )}
        />
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
      <Field.Root invalid={!!form.formState.errors.amount} required>
        <Field.Label>
          {t('columns.amount')}
          <Field.RequiredIndicator />
        </Field.Label>
        <NumberInput.Root w='full'>
          <NumberInput.Control />
          <NumberInput.Input
            {...form.register('amount', { valueAsNumber: true })}
            placeholder={t('columns.amount')}
          />
        </NumberInput.Root>
        <Field.ErrorText>
          {form.formState.errors.amount?.message}
        </Field.ErrorText>
      </Field.Root>
      <Field.Root invalid={!!form.formState.errors.batch} required>
        <Field.Label>
          {t('columns.batch')}
          <Field.RequiredIndicator />
        </Field.Label>
        <NumberInput.Root w='full'>
          <NumberInput.Control />
          <NumberInput.Input
            {...form.register('batch', { valueAsNumber: true })}
            placeholder={t('columns.batch')}
          />
        </NumberInput.Root>
        <Field.ErrorText>
          {form.formState.errors.batch?.message}
        </Field.ErrorText>
      </Field.Root>
      <Field.Root required>
        <Field.Label>
          {t('columns.unit')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Controller
          control={form.control}
          name='unit'
          render={({ field }) => (
            <UnitsSegmentGroup value={field.value} setValue={field.onChange} />
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
