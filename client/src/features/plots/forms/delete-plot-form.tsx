'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plot } from '../types';
import { deleteMyPlotAction, deleteUserPlotAction } from '../actions';
import { deletePlotSchema, DeletePlotType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  plot: Plot;
  isAll: boolean;
};

export default function DeletePlotForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<DeletePlotType>({
    resolver: zodResolver(deletePlotSchema),
    defaultValues: {
      plotId: props.plot.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await deleteUserPlotAction(data)
      : await deleteMyPlotAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.plots.delete.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.plots.delete.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit} />
  );
}
