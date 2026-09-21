'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, NumberInput } from '@chakra-ui/react';
import { Product } from '../types';
import { buyMyProductAction, buyUserProductAction } from '../actions';
import { buyProductSchema, BuyProductType } from '../schema';
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
  product: Product;
  isAll: boolean;
};

export default function BuyProductForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<BuyProductType>({
    resolver: zodResolver(buyProductSchema),
    defaultValues: {
      productId: props.product.id,
      amount: 1,
    },
  });

  const [userId, setUserId] = useState(0);

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await buyUserProductAction({ ...data, userId })
      : await buyMyProductAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.products.buy.success');
        toaster.success({ title });
        router.push('/purchases/my');
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.products.buy.failure');
        toaster.error({ title });
      }
    }
  });

  const users = useSelectAllUsers(props.isAll);
  const cards = props.isAll
    ? useSelectUserCardsWithBalance(userId)
    : useSelectMyCards();

  const card = cards.data?.find((card) => card.id === form.watch('cardId'));
  const notEnoughBalance =
    card && card.balance < form.watch('amount') * props.product.price;

  return (
    <CustomForm
      disabled={form.formState.isSubmitting || !!notEnoughBalance}
      onSubmit={onSubmit}
    >
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
      <Field.Root
        disabled={props.isAll && !userId}
        invalid={notEnoughBalance}
        required
      >
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
      <Field.Root invalid={!!form.formState.errors.amount} required>
        <Field.Label>
          {t('columns.amount')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Controller
          control={form.control}
          name='amount'
          render={({ field }) => (
            <NumberInput.Root
              w='full'
              value={Number.isNaN(field.value) ? '' : String(field.value)}
              onValueChange={(d) => field.onChange(d.valueAsNumber)}
            >
              <NumberInput.Control />
              <NumberInput.Input placeholder={t('columns.amount')} />
            </NumberInput.Root>
          )}
        />
        <Field.ErrorText>
          {form.formState.errors.amount?.message}
        </Field.ErrorText>
      </Field.Root>
    </CustomForm>
  );
}
