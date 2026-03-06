'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Input, NumberInput } from '@chakra-ui/react';
import { createMyGoodAction, createUserGoodAction } from '../actions';
import { createGoodSchema, CreateGoodType } from '../schema';
import { useSelectAllUsers } from '@/features/users/hooks';
import { useSelectMyShops, useSelectUserShops } from '@/features/shops/hooks';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';
import UsersCombobox from '@/features/users/components/users-combobox';
import ShopsCombobox from '@/features/shops/components/shops-combobox';
import ItemsCombobox from '@/components/items-combobox';
import UnitsSegmentGroup from '@/components/units-segment-group';

type Props = {
  isAll: boolean;
};

export default function CreateGoodForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<CreateGoodType>({
    resolver: zodResolver(createGoodSchema),
  });

  const [userId, setUserId] = useState(0);

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await createUserGoodAction(data)
      : await createMyGoodAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.goods.create.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.goods.create.failure');
        toaster.error({ title });
      }
    }
  });

  const users = useSelectAllUsers(props.isAll);
  const shops = props.isAll ? useSelectUserShops(userId) : useSelectMyShops();

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
      <Field.Root disabled={props.isAll && !userId} required>
        <Field.Label>
          {t('columns.shop')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Controller
          control={form.control}
          name='shopId'
          render={({ field }) => (
            <ShopsCombobox
              data={shops.data}
              loading={shops.isLoading}
              placeholder={t('columns.shop')}
              value={field.value}
              setValue={field.onChange}
            />
          )}
        />
      </Field.Root>
      <Field.Root required>
        <Field.Label>
          {t('columns.item')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Controller
          control={form.control}
          name='item'
          render={({ field }) => (
            <ItemsCombobox value={field.value} setValue={field.onChange} />
          )}
        />
      </Field.Root>
      <Field.Root invalid={!!form.formState.errors.description}>
        <Field.Label>{t('columns.description')}</Field.Label>
        <Input
          {...form.register('description')}
          placeholder={t('columns.description')}
        />
        <Field.ErrorText>
          {form.formState.errors.description?.message}
        </Field.ErrorText>
      </Field.Root>
      <Field.Root invalid={!!form.formState.errors.amount} required>
        <Field.Label>
          {t('columns.amount')}
          <Field.RequiredIndicator />
        </Field.Label>
        <NumberInput.Root w='full'>
          <NumberInput.Control />
          <NumberInput.Input
            {...form.register('amount', { valueAsNumber: true })}
            placeholder={t('columns.amount')}
          />
        </NumberInput.Root>
        <Field.ErrorText>
          {form.formState.errors.amount?.message}
        </Field.ErrorText>
      </Field.Root>
      <Field.Root invalid={!!form.formState.errors.batch} required>
        <Field.Label>
          {t('columns.batch')}
          <Field.RequiredIndicator />
        </Field.Label>
        <NumberInput.Root w='full'>
          <NumberInput.Control />
          <NumberInput.Input
            {...form.register('batch', { valueAsNumber: true })}
            placeholder={t('columns.batch')}
          />
        </NumberInput.Root>
        <Field.ErrorText>
          {form.formState.errors.batch?.message}
        </Field.ErrorText>
      </Field.Root>
      <Field.Root required>
        <Field.Label>
          {t('columns.unit')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Controller
          control={form.control}
          name='unit'
          render={({ field }) => (
            <UnitsSegmentGroup value={field.value} setValue={field.onChange} />
          )}
        />
      </Field.Root>
      <Field.Root invalid={!!form.formState.errors.price} required>
        <Field.Label>
          {t('columns.price')}
          <Field.RequiredIndicator />
        </Field.Label>
        <NumberInput.Root w='full'>
          <NumberInput.Control />
          <NumberInput.Input
            {...form.register('price', { valueAsNumber: true })}
            placeholder={t('columns.price')}
          />
        </NumberInput.Root>
        <Field.ErrorText>
          {form.formState.errors.price?.message}
        </Field.ErrorText>
      </Field.Root>
    </CustomForm>
  );
}
