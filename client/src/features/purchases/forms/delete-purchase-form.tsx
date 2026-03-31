'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Purchase } from '../types';
import { deletePurchaseAction } from '../actions';
import { deletePurchaseSchema, DeletePurchaseType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  purchase: Purchase;
};

export default function DeletePurchaseForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<DeletePurchaseType>({
    resolver: zodResolver(deletePurchaseSchema),
    defaultValues: {
      purchaseId: props.purchase.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await deletePurchaseAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.purchases.delete.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.purchases.delete.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit} />
  );
}
