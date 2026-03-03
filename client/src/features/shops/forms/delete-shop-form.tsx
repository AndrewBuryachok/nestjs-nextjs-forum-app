'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Shop } from '../types';
import { deleteMyShopAction, deleteUserShopAction } from '../actions';
import { deleteShopSchema, DeleteShopType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  shop: Shop;
  isAll: boolean;
};

export default function DeleteShopForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<DeleteShopType>({
    resolver: zodResolver(deleteShopSchema),
    defaultValues: {
      shopId: props.shop.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await deleteUserShopAction(data)
      : await deleteMyShopAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.shops.delete.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.shops.delete.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit} />
  );
}
