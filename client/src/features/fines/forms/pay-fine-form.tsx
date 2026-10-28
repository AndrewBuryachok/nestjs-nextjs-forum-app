'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field } from '@chakra-ui/react';
import { Fine } from '../types';
import { payFineAction } from '../actions';
import { payFineSchema, PayFineType } from '../schema';
import { useSelectMyCards } from '@/features/cards/hooks';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';
import CardsWithBalanceCombobox from '@/features/cards/components/cards-with-balance-combobox';

type Props = {
  fine: Fine;
};

export default function PayFineForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<PayFineType>({
    resolver: zodResolver(payFineSchema),
    defaultValues: {
      fineId: props.fine.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await payFineAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.fines.pay.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.fines.pay.failure');
        toaster.error({ title });
      }
    }
  });

  const cards = useSelectMyCards();

  const card = cards.data?.find((card) => card.id === form.watch('cardId'));
  const notEnoughBalance = card && card.balance < props.fine.sum;

  return (
    <CustomForm
      disabled={form.formState.isSubmitting || !!notEnoughBalance}
      onSubmit={onSubmit}
    >
      <Field.Root invalid={notEnoughBalance} required>
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
    </CustomForm>
  );
}
