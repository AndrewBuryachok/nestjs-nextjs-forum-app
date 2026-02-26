'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field } from '@chakra-ui/react';
import { Card } from '../types';
import { addMyCardUserAction, addUserCardUserAction } from '../actions';
import { updateCardUserSchema, UpdateCardUserType } from '../schema';
import { useSelectNotCardUsers } from '../hooks';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';
import UsersCombobox from '@/features/users/components/users-combobox';

type Props = {
  card: Card;
  isAll: boolean;
};

export default function AddCardUserForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<UpdateCardUserType>({
    resolver: zodResolver(updateCardUserSchema),
    defaultValues: {
      cardId: props.card.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await addUserCardUserAction(data)
      : await addMyCardUserAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.cards.addUser.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.cards.addUser.failure');
        toaster.error({ title });
      }
    }
  });

  const users = useSelectNotCardUsers(props.card.id);

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit}>
      <Field.Root required>
        <Field.Label>
          {t('columns.user')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Controller
          control={form.control}
          name='userId'
          render={({ field }) => (
            <UsersCombobox
              data={users.data}
              loading={users.isLoading}
              placeholder={t('columns.user')}
              value={field.value}
              setValue={field.onChange}
            />
          )}
        />
      </Field.Root>
    </CustomForm>
  );
}
