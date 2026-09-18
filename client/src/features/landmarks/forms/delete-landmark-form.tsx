'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Landmark } from '../types';
import { deleteMyLandmarkAction, deleteUserLandmarkAction } from '../actions';
import { deleteLandmarkSchema, DeleteLandmarkType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  landmark: Landmark;
  isAll: boolean;
};

export default function DeleteLandmarkForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<DeleteLandmarkType>({
    resolver: zodResolver(deleteLandmarkSchema),
    defaultValues: {
      landmarkId: props.landmark.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await deleteUserLandmarkAction(data)
      : await deleteMyLandmarkAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.landmarks.delete.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.landmarks.delete.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit} />
  );
}
