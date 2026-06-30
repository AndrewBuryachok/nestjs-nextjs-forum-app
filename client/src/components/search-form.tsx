'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Input } from '@chakra-ui/react';
import { requestSchema } from '@/types/request';
import { searchSchema, SearchType } from '@/types/search';
import { useDialogContext } from '@/providers/dialog-provider';
import CustomForm from '@/components/custom-form';

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

  return (
    <CustomForm
      disabled={!form.formState.isDirty}
      loading={form.formState.isSubmitting}
      onSubmit={onSubmit}
    >
      <Field.Root invalid={!!form.formState.errors.id}>
        <Field.Label>{t('columns.id')}</Field.Label>
        <Input
          {...form.register('id', {
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
          placeholder={t('columns.id')}
          type='number'
        />
        <Field.ErrorText>{form.formState.errors.id?.message}</Field.ErrorText>
      </Field.Root>
    </CustomForm>
  );
}
