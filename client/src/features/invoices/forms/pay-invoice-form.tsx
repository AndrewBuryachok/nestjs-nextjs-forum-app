'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field } from '@chakra-ui/react';
import { Invoice } from '../types';
import { payMyInvoiceAction, payUserInvoiceAction } from '../actions';
import { payInvoiceSchema, PayInvoiceType } from '../schema';
import {
  useSelectMyCards,
  useSelectUserCardsWithBalance,
} from '@/features/cards/hooks';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';
import CardsWithBalanceCombobox from '@/features/cards/components/cards-with-balance-combobox';

type Props = {
  invoice: Invoice;
  isAll: boolean;
};

export default function PayInvoiceForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<PayInvoiceType>({
    resolver: zodResolver(payInvoiceSchema),
    defaultValues: {
      invoiceId: props.invoice.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await payUserInvoiceAction(data)
      : await payMyInvoiceAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.invoices.pay.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.invoices.pay.failure');
        toaster.error({ title });
      }
    }
  });

  const cards = props.isAll
    ? useSelectUserCardsWithBalance(props.invoice.receiverUser.id)
    : useSelectMyCards();

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit}>
      <Field.Root required>
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
    </CustomForm>
  );
}
