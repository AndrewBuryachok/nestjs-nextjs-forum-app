'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Input, NumberInput } from '@chakra-ui/react';
import { createMyMarketAction, createUserMarketAction } from '../actions';
import { createMarketSchema, CreateMarketType } from '../schema';
import { useSelectAllUsers } from '@/features/users/hooks';
import {
  useSelectMyCards,
  useSelectUserCardsWithBalance,
} from '@/features/cards/hooks';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';
import UsersCombobox from '@/features/users/components/users-combobox';
import CardsWithBalanceCombobox from '@/features/cards/components/cards-with-balance-combobox';

type Props = {
  isAll: boolean;
};

export default function CreateMarketForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<CreateMarketType>({
    resolver: zodResolver(createMarketSchema),
    defaultValues: {
      x: 0,
      y: 0,
    },
  });

  const [userId, setUserId] = useState(0);

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await createUserMarketAction({ ...data, userId })
      : await createMyMarketAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.markets.create.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.markets.create.failure');
        toaster.error({ title });
      }
    }
  });

  const users = useSelectAllUsers(props.isAll);
  const cards = props.isAll
    ? useSelectUserCardsWithBalance(userId)
    : useSelectMyCards();

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
          {t('columns.card')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Controller
          control={form.control}
          name='cardId'
          render={({ field }) => (
            <CardsWithBalanceCombobox
              data={cards.data}
              loading={cards.isLoading}
              placeholder={t('columns.card')}
              value={field.value}
              setValue={field.onChange}
            />
          )}
        />
      </Field.Root>
      <Field.Root invalid={!!form.formState.errors.name} required>
        <Field.Label>
          {t('columns.name')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Input {...form.register('name')} placeholder={t('columns.name')} />
        <Field.ErrorText>{form.formState.errors.name?.message}</Field.ErrorText>
      </Field.Root>
      <Field.Root invalid={!!form.formState.errors.x} required>
        <Field.Label>
          {t('columns.x')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Controller
          control={form.control}
          name='x'
          render={({ field }) => (
            <NumberInput.Root
              w='full'
              value={String(field.value)}
              onValueChange={(d) => field.onChange(d.valueAsNumber)}
            >
              <NumberInput.Control />
              <NumberInput.Input placeholder={t('columns.x')} />
            </NumberInput.Root>
          )}
        />
        <Field.ErrorText>{form.formState.errors.x?.message}</Field.ErrorText>
      </Field.Root>
      <Field.Root invalid={!!form.formState.errors.y} required>
        <Field.Label>
          {t('columns.y')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Controller
          control={form.control}
          name='y'
          render={({ field }) => (
            <NumberInput.Root
              w='full'
              value={String(field.value)}
              onValueChange={(d) => field.onChange(d.valueAsNumber)}
            >
              <NumberInput.Control />
              <NumberInput.Input placeholder={t('columns.y')} />
            </NumberInput.Root>
          )}
        />
        <Field.ErrorText>{form.formState.errors.y?.message}</Field.ErrorText>
      </Field.Root>
    </CustomForm>
  );
}
