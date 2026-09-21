'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Input, NumberInput } from '@chakra-ui/react';
import { Product } from '../types';
import { editMyProductAction, editUserProductAction } from '../actions';
import { editProductSchema, EditProductType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';
import ItemsCombobox from '@/components/items-combobox';
import UnitsSegmentGroup from '@/components/units-segment-group';

type Props = {
  product: Product;
  isAll: boolean;
};

export default function EditProductForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<EditProductType>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      productId: props.product.id,
      item: props.product.item,
      description: props.product.description,
      amount: props.product.amount,
      batch: props.product.batch,
      unit: props.product.unit,
      price: props.product.price,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await editUserProductAction(data)
      : await editMyProductAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.products.edit.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.products.edit.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm
      disabled={form.formState.isSubmitting || !form.formState.isDirty}
      onSubmit={onSubmit}
    >
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
