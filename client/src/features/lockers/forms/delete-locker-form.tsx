'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Locker } from '../types';
import { deleteMyLockerAction, deleteUserLockerAction } from '../actions';
import { deleteLockerSchema, DeleteLockerType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  locker: Locker;
  isAll: boolean;
};

export default function DeleteLockerForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<DeleteLockerType>({
    resolver: zodResolver(deleteLockerSchema),
    defaultValues: {
      lockerId: props.locker.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await deleteUserLockerAction(data)
      : await deleteMyLockerAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.lockers.delete.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.lockers.delete.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit} />
  );
}
