'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Input } from '@chakra-ui/react';
import { Invoice } from '../types';
import { editMyInvoiceAction, editUserInvoiceAction } from '../actions';
import { editInvoiceSchema, EditInvoiceType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  invoice: Invoice;
  isAll: boolean;
};

export default function EditInvoiceForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<EditInvoiceType>({
    resolver: zodResolver(editInvoiceSchema),
    defaultValues: {
      invoiceId: props.invoice.id,
      sum: props.invoice.sum,
      description: props.invoice.description,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await editUserInvoiceAction(data)
      : await editMyInvoiceAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.invoices.edit.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.invoices.edit.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm
      disabled={!form.formState.isDirty}
      loading={form.formState.isSubmitting}
      onSubmit={onSubmit}
    >
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
