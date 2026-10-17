'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '../../users/types';
import { rejectApplicationAction } from '../actions';
import {
  acceptOrRejectApplicationSchema,
  AcceptOrRejectApplicationType,
} from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  user: User;
};

export default function RejectApplicationForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<AcceptOrRejectApplicationType>({
    resolver: zodResolver(acceptOrRejectApplicationSchema),
    defaultValues: {
      userId: props.user.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await rejectApplicationAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.applications.reject.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title =
          res.data.message ?? t('toasts.applications.reject.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit} />
  );
}
