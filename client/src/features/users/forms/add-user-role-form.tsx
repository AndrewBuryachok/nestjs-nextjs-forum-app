'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field } from '@chakra-ui/react';
import { User } from '../types';
import { addUserRoleAction } from '../actions';
import { updateUserRoleSchema, UpdateUserRoleType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';
import RolesCombobox from '@/components/roles-combobox';
import { Role } from '@/constants/roles';

type Props = {
  user: User;
};

export default function AddUserRoleForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<UpdateUserRoleType>({
    resolver: zodResolver(updateUserRoleSchema),
    defaultValues: {
      userId: props.user.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await addUserRoleAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.users.addRole.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.users.addRole.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit}>
      <Field.Root required>
        <Field.Label>
          {t('columns.role')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Controller
          control={form.control}
          name='role'
          render={({ field }) => (
            <RolesCombobox
              data={Object.values(Role).filter(
                (role) => !props.user.roles.includes(role),
              )}
              value={field.value}
              setValue={field.onChange}
            />
          )}
        />
      </Field.Root>
    </CustomForm>
  );
}
