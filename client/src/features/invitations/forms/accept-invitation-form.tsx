'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Town } from '../../towns/types';
import { acceptInvitationAction } from '../actions';
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

export default function AcceptInvitationForm(props: Props) {
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
    const res = await acceptInvitationAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.invitations.accept.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title =
          res.data.message ?? t('toasts.invitations.accept.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit} />
  );
}
