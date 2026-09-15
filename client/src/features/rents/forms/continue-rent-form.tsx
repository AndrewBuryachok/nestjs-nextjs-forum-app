'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field } from '@chakra-ui/react';
import { Rent } from '../types';
import { continueMyRentAction, continueUserRentAction } from '../actions';
import { continueRentSchema, ContinueRentType } from '../schema';
import {
  useSelectMyCards,
  useSelectUserCardsWithBalance,
} from '@/features/cards/hooks';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';
import CardsWithBalanceCombobox from '@/features/cards/components/cards-with-balance-combobox';

type Props = {
  rent: Rent;
  isAll: boolean;
};

export default function ContinueRentForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<ContinueRentType>({
    resolver: zodResolver(continueRentSchema),
    defaultValues: {
      rentId: props.rent.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await continueUserRentAction(data)
      : await continueMyRentAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.rents.continue.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.rents.continue.failure');
        toaster.error({ title });
      }
    }
  });

  const cards = props.isAll
    ? useSelectUserCardsWithBalance(props.rent.user.id)
    : useSelectMyCards();

  const card = cards.data?.find((card) => card.id === props.rent.card.id);
  const notEnoughBalance = card && card.balance < props.rent.plot.price;

  return (
    <CustomForm
      disabled={form.formState.isSubmitting || !!notEnoughBalance}
      onSubmit={onSubmit}
    >
      <Field.Root invalid={notEnoughBalance} readOnly required>
        <Field.Label>
          {t('columns.card')}
          <Field.RequiredIndicator />
        </Field.Label>
        <CardsWithBalanceCombobox
          data={cards.data}
          loading={cards.isLoading}
          placeholder={t('columns.card')}
          value={props.rent.card.id}
          setValue={() => {}}
        />
        <Field.ErrorText>
          {notEnoughBalance && t('errors.not_enough_balance')}
        </Field.ErrorText>
      </Field.Root>
    </CustomForm>
  );
}
