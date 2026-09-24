'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Rent } from '../types';
import { continueMyRentAction, continueUserRentAction } from '../actions';
import { continueRentSchema, ContinueRentType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  rent: Rent;
  isAll: boolean;
};

export default function ContinueRentForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<ContinueRentType>({
    resolver: zodResolver(continueRentSchema),
    defaultValues: {
      rentId: props.rent.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await continueUserRentAction(data)
      : await continueMyRentAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.rents.continue.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.rents.continue.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit} />
  );
}
