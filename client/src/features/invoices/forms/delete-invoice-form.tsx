'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Invoice } from '../types';
import { deleteMyInvoiceAction, deleteUserInvoiceAction } from '../actions';
import { deleteInvoiceSchema, DeleteInvoiceType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  invoice: Invoice;
  isAll: boolean;
};

export default function DeleteInvoiceForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<DeleteInvoiceType>({
    resolver: zodResolver(deleteInvoiceSchema),
    defaultValues: {
      invoiceId: props.invoice.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await deleteUserInvoiceAction(data)
      : await deleteMyInvoiceAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.invoices.delete.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.invoices.delete.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit} />
  );
}
