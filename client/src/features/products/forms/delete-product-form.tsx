'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Product } from '../types';
import { deleteMyProductAction, deleteUserProductAction } from '../actions';
import { deleteProductSchema, DeleteProductType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  product: Product;
  isAll: boolean;
};

export default function DeleteProductForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<DeleteProductType>({
    resolver: zodResolver(deleteProductSchema),
    defaultValues: {
      productId: props.product.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await deleteUserProductAction(data)
      : await deleteMyProductAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.products.delete.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.products.delete.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit} />
  );
}
