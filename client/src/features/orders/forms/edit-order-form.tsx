'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Input } from '@chakra-ui/react';
import { Order } from '../types';
import { editMyOrderAction, editUserOrderAction } from '../actions';
import { editOrderSchema, EditOrderType } from '../schema';
import {
  useSelectMyCards,
  useSelectUserCardsWithBalance,
} from '@/features/cards/hooks';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';
import CardsWithBalanceCombobox from '@/features/cards/components/cards-with-balance-combobox';
import ItemsCombobox from '@/components/items-combobox';
import UnitsSegmentGroup from '@/components/units-segment-group';

type Props = {
  order: Order;
  isAll: boolean;
};

export default function EditOrderForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<EditOrderType>({
    resolver: zodResolver(editOrderSchema),
    defaultValues: {
      orderId: props.order.id,
      item: props.order.item,
      description: props.order.description,
      amount: props.order.amount,
      batch: props.order.batch,
      unit: props.order.unit,
      sum: props.order.sum,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await editUserOrderAction(data)
      : await editMyOrderAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.orders.edit.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.orders.edit.failure');
        toaster.error({ title });
      }
    }
  });

  const cards = props.isAll
    ? useSelectUserCardsWithBalance(props.order.customerUser.id)
    : useSelectMyCards();

  const [sum] = useWatch({ control: form.control, name: ['sum'] });
  const card = cards.data?.find(
    (card) => card.id === props.order.customerCard.id,
  );
  const notEnoughBalance = !!card && card.balance < sum - props.order.sum;

  return (
    <CustomForm
      disabled={!form.formState.isDirty || notEnoughBalance}
      loading={form.formState.isSubmitting}
      onSubmit={onSubmit}
    >
      <Field.Root invalid={notEnoughBalance} readOnly>
        <Field.Label>{t('columns.card')}</Field.Label>
        <CardsWithBalanceCombobox
          data={cards.data}
          loading={cards.isLoading}
          placeholder={t('columns.card')}
          value={props.order.customerCard.id}
          setValue={() => {}}
        />
        <Field.ErrorText>{t('errors.notEnoughBalance')}</Field.ErrorText>
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
        <Input
          {...form.register('amount', { valueAsNumber: true })}
          placeholder={t('columns.amount')}
          type='number'
        />
        <Field.ErrorText>
          {form.formState.errors.amount?.message}
        </Field.ErrorText>
      </Field.Root>
      <Field.Root invalid={!!form.formState.errors.batch} required>
        <Field.Label>
          {t('columns.batch')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Input
          {...form.register('batch', { valueAsNumber: true })}
          placeholder={t('columns.batch')}
          type='number'
        />
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
        <Input
          {...form.register('sum', { valueAsNumber: true })}
          placeholder={t('columns.sum')}
          type='number'
        />
        <Field.ErrorText>{form.formState.errors.sum?.message}</Field.ErrorText>
      </Field.Root>
    </CustomForm>
  );
}
