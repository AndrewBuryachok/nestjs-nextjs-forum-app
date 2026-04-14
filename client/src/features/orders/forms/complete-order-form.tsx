'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Order } from '../types';
import { completeMyOrderAction, completeUserOrderAction } from '../actions';
import { completeOrderSchema, CompleteOrderType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  order: Order;
  isAll: boolean;
};

export default function CompleteOrderForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<CompleteOrderType>({
    resolver: zodResolver(completeOrderSchema),
    defaultValues: {
      orderId: props.order.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await completeUserOrderAction(data)
      : await completeMyOrderAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.orders.complete.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.orders.complete.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit} />
  );
}
