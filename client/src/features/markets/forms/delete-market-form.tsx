'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Market } from '../types';
import { deleteMyMarketAction, deleteUserMarketAction } from '../actions';
import { deleteMarketSchema, DeleteMarketType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  market: Market;
  isAll: boolean;
};

export default function DeleteMarketForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<DeleteMarketType>({
    resolver: zodResolver(deleteMarketSchema),
    defaultValues: {
      marketId: props.market.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await deleteUserMarketAction(data)
      : await deleteMyMarketAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.markets.delete.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.markets.delete.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit} />
  );
}
