'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Input } from '@chakra-ui/react';
import { Card } from '../types';
import { editMyCardAction, editUserCardAction } from '../actions';
import { editCardSchema, EditCardType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  card: Card;
  isAll: boolean;
};

export default function EditCardForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<EditCardType>({
    resolver: zodResolver(editCardSchema),
    defaultValues: {
      cardId: props.card.id,
      name: props.card.account.name,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await editUserCardAction(data)
      : await editMyCardAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.cards.edit.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.cards.edit.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit}>
      <Field.Root invalid={!!form.formState.errors.name} required>
        <Field.Label>
          {t('columns.name')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Input {...form.register('name')} placeholder={t('columns.name')} />
        <Field.ErrorText>{form.formState.errors.name?.message}</Field.ErrorText>
      </Field.Root>
    </CustomForm>
  );
}
