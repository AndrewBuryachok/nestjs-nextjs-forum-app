'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Input } from '@chakra-ui/react';
import { createMyComplaintAction, createUserComplaintAction } from '../actions';
import { createComplaintSchema, CreateComplaintType } from '../schema';
import { useSelectAllUsers } from '@/features/users/hooks';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';
import UsersCombobox from '@/features/users/components/users-combobox';

type Props = {
  isAll: boolean;
};

export default function CreateComplaintForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<CreateComplaintType>({
    resolver: zodResolver(createComplaintSchema),
  });

  const [senderUserId, setSenderUserId] = useState(0);
  const [receiverUserId, setReceiverUserId] = useState(0);

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await createUserComplaintAction({
          ...data,
          receiverUserId,
          senderUserId,
        })
      : await createMyComplaintAction({ ...data, receiverUserId });
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.complaints.create.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.complaints.create.failure');
        toaster.error({ title });
      }
    }
  });

  const users = useSelectAllUsers();

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit}>
      {props.isAll && (
        <Field.Root required>
          <Field.Label>
            {t('columns.sender')}
            <Field.RequiredIndicator />
          </Field.Label>
          <UsersCombobox
            data={users.data}
            loading={users.isLoading}
            placeholder={t('columns.sender')}
            value={senderUserId}
            setValue={setSenderUserId}
          />
        </Field.Root>
      )}
      <Field.Root required>
        <Field.Label>
          {t('columns.receiver')}
          <Field.RequiredIndicator />
        </Field.Label>
        <UsersCombobox
          data={users.data}
          loading={users.isLoading}
          placeholder={t('columns.receiver')}
          value={receiverUserId}
          setValue={setReceiverUserId}
        />
      </Field.Root>
      <Field.Root invalid={!!form.formState.errors.title} required>
        <Field.Label>
          {t('columns.title')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Input {...form.register('title')} placeholder={t('columns.title')} />
        <Field.ErrorText>
          {form.formState.errors.title?.message}
        </Field.ErrorText>
      </Field.Root>
    </CustomForm>
  );
}
