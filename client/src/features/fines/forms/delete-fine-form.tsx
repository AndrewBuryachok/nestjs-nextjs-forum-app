'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Fine } from '../types';
import { deleteMyFineAction, deleteUserFineAction } from '../actions';
import { deleteFineSchema, DeleteFineType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  fine: Fine;
  isAll: boolean;
};

export default function DeleteFineForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<DeleteFineType>({
    resolver: zodResolver(deleteFineSchema),
    defaultValues: {
      fineId: props.fine.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await deleteUserFineAction(data)
      : await deleteMyFineAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.fines.delete.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.fines.delete.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit} />
  );
}
