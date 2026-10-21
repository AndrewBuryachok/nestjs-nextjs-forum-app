'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field } from '@chakra-ui/react';
import { Town } from '../types';
import { removeMyTownChunkAction, removeUserTownChunkAction } from '../actions';
import { updateTownChunkSchema, UpdateTownChunkType } from '../schema';
import { useSelectTownChunks } from '../hooks';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';
import ChunksCombobox from '@/components/chunks-combobox';

type Props = {
  town: Town;
  isAll: boolean;
};

export default function RemoveTownChunkForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<UpdateTownChunkType>({
    resolver: zodResolver(updateTownChunkSchema),
    defaultValues: {
      x: 0,
      y: 0,
    },
  });

  const [townChunkId, setTownChunkId] = useState(0);

  const onSubmit = form.handleSubmit(async (data) => {
    const res = props.isAll
      ? await removeUserTownChunkAction(data)
      : await removeMyTownChunkAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.towns.removeChunk.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.towns.removeChunk.failure');
        toaster.error({ title });
      }
    }
  });

  const townChunks = useSelectTownChunks(props.town.id);

  useEffect(() => {
    const townChunk = townChunks.data?.find(
      (townChunk) => townChunk.id === townChunkId,
    );
    if (townChunk) {
      form.setValue('townId', props.town.id);
      form.setValue('x', townChunk.x);
      form.setValue('y', townChunk.y);
    } else {
      form.setValue('townId', 0);
      form.setValue('x', 0);
      form.setValue('y', 0);
    }
  }, [townChunkId]);

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit}>
      <Field.Root invalid={!!form.formState.errors.townId} required>
        <Field.Label>
          {t('columns.chunk')}
          <Field.RequiredIndicator />
        </Field.Label>
        <ChunksCombobox
          data={townChunks.data}
          loading={townChunks.isLoading}
          placeholder={t('columns.chunk')}
          value={townChunkId}
          setValue={setTownChunkId}
        />
        <Field.ErrorText>
          {form.formState.errors.townId?.message}
        </Field.ErrorText>
      </Field.Root>
    </CustomForm>
  );
}
