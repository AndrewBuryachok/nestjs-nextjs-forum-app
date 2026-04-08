'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Order } from '../types';
import { deleteMyOrderAction, deleteUserOrderAction } from '../actions';
import { deleteOrderSchema, DeleteOrderType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  order: Order;
  isAll: boolean;
};

export default function DeleteOrderForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<DeleteOrderType>({
    resolver: zodResolver(deleteOrderSchema),
    defaultValues: {
      orderId: props.order.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await deleteUserOrderAction(data)
      : await deleteMyOrderAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.orders.delete.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.orders.delete.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit} />
  );
}
