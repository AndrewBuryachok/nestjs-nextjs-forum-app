'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Transaction } from '../types';
import { deleteTransactionAction } from '../actions';
import { deleteTransactionSchema, DeleteTransactionType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  transaction: Transaction;
};

export default function DeleteTransactionForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<DeleteTransactionType>({
    resolver: zodResolver(deleteTransactionSchema),
    defaultValues: {
      transactionId: props.transaction.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await deleteTransactionAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.transactions.delete.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title =
          res.data.message ?? t('toasts.transactions.delete.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit} />
  );
}
