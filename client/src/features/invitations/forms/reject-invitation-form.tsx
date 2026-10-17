'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Town } from '../../towns/types';
import { rejectInvitationAction } from '../actions';
import {
  acceptOrRejectInvitationSchema,
  AcceptOrRejectInvitationType,
} from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  town: Town;
};

export default function RejectInvitationForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<AcceptOrRejectInvitationType>({
    resolver: zodResolver(acceptOrRejectInvitationSchema),
    defaultValues: {
      townId: props.town.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await rejectInvitationAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.invitations.reject.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title =
          res.data.message ?? t('toasts.invitations.reject.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit} />
  );
}
