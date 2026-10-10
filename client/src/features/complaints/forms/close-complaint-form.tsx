'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Textarea } from '@chakra-ui/react';
import { Complaint } from '../types';
import { closeComplaintAction } from '../actions';
import { closeComplaintSchema, CloseComplaintType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  complaint: Complaint;
};

export default function CloseComplaintForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<CloseComplaintType>({
    resolver: zodResolver(closeComplaintSchema),
    defaultValues: {
      complaintId: props.complaint.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await closeComplaintAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.complaints.close.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.complaints.close.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit}>
      <Field.Root invalid={!!form.formState.errors.text} required>
        <Field.Label>
          {t('columns.text')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Textarea
          {...form.register('text')}
          autoresize
          placeholder={t('columns.message')}
        />
        <Field.ErrorText>{form.formState.errors.text?.message}</Field.ErrorText>
      </Field.Root>
    </CustomForm>
  );
}
