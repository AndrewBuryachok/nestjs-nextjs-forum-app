'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Input } from '@chakra-ui/react';
import { createCardAction, createCardWithUserAction } from '../actions';
import { createCardSchema, CreateCardType } from '../schema';
import { useSelectAllUsers } from '@/features/users/hooks';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';
import UsersCombobox from '@/features/users/components/users-combobox';

type Props = {
  isAll: boolean;
};

export default function CreateCardForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<CreateCardType>({
    resolver: zodResolver(createCardSchema),
  });

  const [userId, setUserId] = useState(0);

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await createCardWithUserAction({ ...data, userId })
      : await createCardAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.cards.create.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.cards.create.failure');
        toaster.error({ title });
      }
    }
  });

  const users = useSelectAllUsers(props.isAll);

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit}>
      {props.isAll && (
        <Field.Root required>
          <Field.Label>
            {t('columns.user')}
            <Field.RequiredIndicator />
          </Field.Label>
          <UsersCombobox
            data={users.data}
            loading={users.isLoading}
            placeholder={t('columns.user')}
            value={userId}
            setValue={setUserId}
          />
        </Field.Root>
      )}
      <Field.Root invalid={!!form.formState.errors.name} required>
        <Field.Label>
          {t('columns.name')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Input {...form.register('name')} placeholder={t('columns.name')} />
        <Field.ErrorText>{form.formState.errors.name?.message}</Field.ErrorText>
      </Field.Root>
    </CustomForm>
  );
}
