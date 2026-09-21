'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, NumberInput } from '@chakra-ui/react';
import { requestSchema } from '@/types/request';
import { searchSchema, SearchType } from '@/types/search';
import { useSelectAllUsers } from '@/features/users/hooks';
import { useDialogContext } from '@/providers/dialog-provider';
import CustomForm from '@/components/custom-form';
import UsersCombobox from '@/features/users/components/users-combobox';
import ItemsCombobox from './items-combobox';
import { Item } from '@/constants/items';

export default function SearchForm() {
  const t = useTranslations();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { closeDialog } = useDialogContext();

  const form = useForm<SearchType>({
    resolver: zodResolver(searchSchema),
    defaultValues: requestSchema.parse(Object.fromEntries(searchParams)),
  });

  const onSubmit = form.handleSubmit((data) => {
    const params = new URLSearchParams(searchParams);
    params.delete('page');
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
    closeDialog();
  });

  const users = useSelectAllUsers();

  return (
    <CustomForm
      disabled={form.formState.isSubmitting || !form.formState.isDirty}
      onSubmit={onSubmit}
    >
      <Field.Root invalid={!!form.formState.errors.id}>
        <Field.Label>{t('columns.id')}</Field.Label>
        <Controller
          control={form.control}
          name='id'
          render={({ field }) => (
            <NumberInput.Root
              w='full'
              value={
                field.value === undefined || Number.isNaN(field.value)
                  ? ''
                  : String(field.value)
              }
              onValueChange={(d) =>
                field.onChange(d.value === '' ? undefined : d.valueAsNumber)
              }
            >
              <NumberInput.Control />
              <NumberInput.Input placeholder={t('columns.id')} />
            </NumberInput.Root>
          )}
        />
        <Field.ErrorText>{form.formState.errors.id?.message}</Field.ErrorText>
      </Field.Root>
      <Field.Root invalid={!!form.formState.errors.user}>
        <Field.Label>{t('columns.user')}</Field.Label>
        <Controller
          control={form.control}
          name='user'
          render={({ field }) => (
            <UsersCombobox
              data={users.data}
              loading={users.isLoading}
              placeholder={t('columns.user')}
              value={field.value ?? 0}
              setValue={field.onChange}
            />
          )}
        />
        <Field.ErrorText>{form.formState.errors.user?.message}</Field.ErrorText>
      </Field.Root>
      {['products', 'purchases', 'orders'].includes(pathname.split('/')[1]) && (
        <Field.Root invalid={!!form.formState.errors.item}>
          <Field.Label>{t('columns.item')}</Field.Label>
          <Controller
            control={form.control}
            name='item'
            render={({ field }) => (
              <ItemsCombobox
                value={(field.value ?? '') as Item}
                setValue={field.onChange}
              />
            )}
          />
          <Field.ErrorText>
            {form.formState.errors.item?.message}
          </Field.ErrorText>
        </Field.Root>
      )}
    </CustomForm>
  );
}
