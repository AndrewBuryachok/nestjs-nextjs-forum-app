'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Input, NumberInput } from '@chakra-ui/react';
import { createMyPlotAction, createUserPlotAction } from '../actions';
import { createPlotSchema, CreatePlotType } from '../schema';
import { useSelectAllUsers } from '@/features/users/hooks';
import {
  useSelectMyMarkets,
  useSelectUserMarkets,
} from '@/features/markets/hooks';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';
import UsersCombobox from '@/features/users/components/users-combobox';
import MarketsCombobox from '@/features/markets/components/markets-combobox';

type Props = {
  isAll: boolean;
};

export default function CreateMarketForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<CreatePlotType>({
    resolver: zodResolver(createPlotSchema),
    defaultValues: {
      x: 0,
      y: 0,
      price: 1,
    },
  });

  const [userId, setUserId] = useState(0);

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await createUserPlotAction({ ...data, userId })
      : await createMyPlotAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.plots.create.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.plots.create.failure');
        toaster.error({ title });
      }
    }
  });

  const users = useSelectAllUsers(props.isAll);
  const markets = props.isAll
    ? useSelectUserMarkets(userId)
    : useSelectMyMarkets();

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
          {t('columns.market')}
          <Field.RequiredIndicator />
        </Field.Label>
        <Controller
          control={form.control}
          name='marketId'
          render={({ field }) => (
            <MarketsCombobox
              data={markets.data}
              loading={markets.isLoading}
              placeholder={t('columns.market')}
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
              value={String(field.value)}
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
