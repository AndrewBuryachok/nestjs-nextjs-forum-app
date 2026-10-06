'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, IconButton, InputGroup, Textarea } from '@chakra-ui/react';
import { LuSend } from 'react-icons/lu';
import { ComplaintWithMessages } from '../types';
import { createComplaintMessageAction } from '../actions';
import {
  createComplaintMessageSchema,
  CreateComplaintMessageType,
} from '../schema';
import { toaster } from '@/components/ui/toaster';

type Props = {
  complaint: ComplaintWithMessages;
};

export default function CreateComplaintMessageForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const form = useForm<CreateComplaintMessageType>({
    resolver: zodResolver(createComplaintMessageSchema),
    defaultValues: {
      complaintId: props.complaint.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await createComplaintMessageAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.complaints.message.success');
        toaster.success({ title });
        form.reset({ complaintId: props.complaint.id, text: '' });
        router.refresh();
      } else {
        const title =
          res.data.message ?? t('toasts.complaints.message.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Field.Root invalid={!!form.formState.errors.text} required>
        <InputGroup
          endAddon={
            <IconButton
              size='2xs'
              variant='ghost'
              type='submit'
              disabled={
                !!props.complaint.closedAt || form.formState.isSubmitting
              }
            >
              <LuSend />
            </IconButton>
          }
        >
          <Textarea
            {...form.register('text')}
            autoresize
            placeholder={t('columns.message')}
            disabled={!!props.complaint.closedAt}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSubmit();
              }
            }}
          />
        </InputGroup>
        <Field.ErrorText>{form.formState.errors.text?.message}</Field.ErrorText>
      </Field.Root>
    </form>
  );
}
