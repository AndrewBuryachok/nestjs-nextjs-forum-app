'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field } from '@chakra-ui/react';
import { Town } from '../types';
import { addMyTownUserAction, addUserTownUserAction } from '../actions';
import { updateTownUserSchema, UpdateTownUserType } from '../schema';
import { useSelectNotTownUsers } from '../hooks';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';
import UsersCombobox from '@/features/users/components/users-combobox';

type Props = {
  town: Town;
  isAll: boolean;
};

export default function AddTownUserForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<UpdateTownUserType>({
    resolver: zodResolver(updateTownUserSchema),
    defaultValues: {
      townId: props.town.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await addUserTownUserAction(data)
      : await addMyTownUserAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.towns.addUser.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.towns.addUser.failure');
        toaster.error({ title });
      }
    }
  });

  const users = useSelectNotTownUsers();

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
