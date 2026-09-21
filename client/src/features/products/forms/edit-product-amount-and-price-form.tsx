'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, NumberInput } from '@chakra-ui/react';
import { Product } from '../types';
import {
  editMyProductAmountAndPriceAction,
  editUserProductAmountAndPriceAction,
} from '../actions';
import {
  editProductAmountAndPriceSchema,
  EditProductAmountAndPriceType,
} from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  product: Product;
  isAll: boolean;
};

export default function EditProductAmountAndPriceForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<EditProductAmountAndPriceType>({
    resolver: zodResolver(editProductAmountAndPriceSchema),
    defaultValues: {
      productId: props.product.id,
      amount: props.product.amount,
      price: props.product.price,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await editUserProductAmountAndPriceAction(data)
      : await editMyProductAmountAndPriceAction(data);
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
