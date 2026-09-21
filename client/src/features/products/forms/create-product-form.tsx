'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Input, NumberInput, SegmentGroup } from '@chakra-ui/react';
import {
  createMyRentProductAction,
  createMyShopProductAction,
  createUserRentProductAction,
  createUserShopProductAction,
} from '../actions';
import { createProductSchema, CreateProductType } from '../schema';
import { useSelectAllUsers } from '@/features/users/hooks';
import { useSelectMyShops, useSelectUserShops } from '@/features/shops/hooks';
import { useSelectMyRents, useSelectUserRents } from '@/features/rents/hooks';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';
import UsersCombobox from '@/features/users/components/users-combobox';
import ShopsCombobox from '@/features/shops/components/shops-combobox';
import RentsCombobox from '@/features/rents/components/rents-combobox';
import ItemsCombobox from '@/components/items-combobox';
import UnitsSegmentGroup from '@/components/units-segment-group';

type Props = {
  isAll: boolean;
};

export default function CreateProductForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<CreateProductType>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      amount: 1,
      batch: 1,
      price: 1,
    },
  });

  const [type, setType] = useState('shop');
  const [userId, setUserId] = useState(0);
  const [shopId, setShopId] = useState(0);
  const [rentId, setRentId] = useState(0);

  const onSubmit = form.handleSubmit(async (data) => {
    const res =
      type === 'shop'
        ? props.isAll
          ? await createUserShopProductAction({ ...data, shopId, userId })
          : await createMyShopProductAction({ ...data, shopId })
        : props.isAll
          ? await createUserRentProductAction({ ...data, rentId, userId })
          : await createMyRentProductAction({ ...data, rentId });
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.products.create.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.products.create.failure');
        toaster.error({ title });
      }
    }
  });

  const users = useSelectAllUsers(props.isAll);
  const shops = props.isAll ? useSelectUserShops(userId) : useSelectMyShops();
  const rents = props.isAll ? useSelectUserRents(userId) : useSelectMyRents();

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit}>
      <SegmentGroup.Root
        w='full'
        value={type}
        onValueChange={({ value }) => value && setType(value)}
      >
        <SegmentGroup.Indicator />
        <SegmentGroup.Items
          w='full'
          items={['shop', 'rent'].map((type) => ({
            value: type,
            label: t(`columns.${type}`),
          }))}
        />
      </SegmentGroup.Root>
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
      {type === 'shop' ? (
        <Field.Root disabled={props.isAll && !userId} required>
          <Field.Label>
            {t('columns.shop')}
            <Field.RequiredIndicator />
          </Field.Label>
          <ShopsCombobox
            data={shops.data}
            loading={shops.isLoading}
            placeholder={t('columns.shop')}
            value={shopId}
            setValue={setShopId}
          />
        </Field.Root>
      ) : (
        <Field.Root disabled={props.isAll && !userId} required>
          <Field.Label>
            {t('columns.rent')}
            <Field.RequiredIndicator />
          </Field.Label>
          <RentsCombobox
            data={rents.data}
            loading={rents.isLoading}
            placeholder={t('columns.rent')}
            value={rentId}
            setValue={setRentId}
          />
        </Field.Root>
      )}
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
        <Controller
          control={form.control}
          name='amount'
          render={({ field }) => (
            <NumberInput.Root
              w='full'
              value={Number.isNaN(field.value) ? '' : String(field.value)}
              onValueChange={(d) => field.onChange(d.valueAsNumber)}
            >
              <NumberInput.Control />
              <NumberInput.Input placeholder={t('columns.amount')} />
            </NumberInput.Root>
          )}
        />
        <Field.ErrorText>
          {form.formState.errors.amount?.message}
        </Field.ErrorText>
      </Field.Root>
      <Field.Root invalid={!!form.formState.errors.batch} required>
        <Field.Label>
          {t('columns.batch')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Controller
          control={form.control}
          name='batch'
          render={({ field }) => (
            <NumberInput.Root
              w='full'
              value={Number.isNaN(field.value) ? '' : String(field.value)}
              onValueChange={(d) => field.onChange(d.valueAsNumber)}
            >
              <NumberInput.Control />
              <NumberInput.Input placeholder={t('columns.batch')} />
            </NumberInput.Root>
          )}
        />
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
        <Controller
          control={form.control}
          name='price'
          render={({ field }) => (
            <NumberInput.Root
              w='full'
              value={Number.isNaN(field.value) ? '' : String(field.value)}
              onValueChange={(d) => field.onChange(d.valueAsNumber)}
            >
              <NumberInput.Control />
              <NumberInput.Input placeholder={t('columns.price')} />
            </NumberInput.Root>
          )}
        />
        <Field.ErrorText>
          {form.formState.errors.price?.message}
        </Field.ErrorText>
      </Field.Root>
    </CustomForm>
  );
}
