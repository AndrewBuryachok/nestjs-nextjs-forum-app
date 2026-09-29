'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Town } from '../types';
import { deleteMyTownAction, deleteUserTownAction } from '../actions';
import { deleteTownSchema, DeleteTownType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  town: Town;
  isAll: boolean;
};

export default function DeleteTownForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<DeleteTownType>({
    resolver: zodResolver(deleteTownSchema),
    defaultValues: {
      townId: props.town.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await deleteUserTownAction(data)
      : await deleteMyTownAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.towns.delete.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.towns.delete.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit} />
  );
}
