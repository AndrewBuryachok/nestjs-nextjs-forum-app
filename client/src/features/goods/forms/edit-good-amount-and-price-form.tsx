'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, NumberInput } from '@chakra-ui/react';
import { Good } from '../types';
import {
  editMyGoodAmountAndPriceAction,
  editUserGoodAmountAndPriceAction,
} from '../actions';
import {
  editGoodAmountAndPriceSchema,
  EditGoodAmountAndPriceType,
} from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  good: Good;
  isAll: boolean;
};

export default function EditGoodAmountAndPriceForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<EditGoodAmountAndPriceType>({
    resolver: zodResolver(editGoodAmountAndPriceSchema),
    defaultValues: {
      goodId: props.good.id,
      amount: props.good.amount,
      price: props.good.price,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await editUserGoodAmountAndPriceAction(data)
      : await editMyGoodAmountAndPriceAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.goods.edit.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.goods.edit.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit}>
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
