'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '../types';
import { deleteMyCardAction, deleteUserCardAction } from '../actions';
import { deleteCardSchema, DeleteCardType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  card: Card;
  isAll: boolean;
};

export default function DeleteCardForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<DeleteCardType>({
    resolver: zodResolver(deleteCardSchema),
    defaultValues: {
      cardId: props.card.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await deleteUserCardAction(data)
      : await deleteMyCardAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.cards.delete.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.cards.delete.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit} />
  );
}
