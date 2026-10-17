'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '../../users/types';
import { deleteInvitationAction } from '../actions';
import {
  createOrDeleteInvitationSchema,
  CreateOrDeleteInvitationType,
} from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  user: User;
};

export default function DeleteInvitationForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<CreateOrDeleteInvitationType>({
    resolver: zodResolver(createOrDeleteInvitationSchema),
    defaultValues: {
      userId: props.user.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await deleteInvitationAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.invitations.delete.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title =
          res.data.message ?? t('toasts.invitations.delete.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit} />
  );
}
