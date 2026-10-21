'use client';

import { useTranslations } from 'next-intl';
import { Town } from '../types';
import { useSelectTownChunks } from '../hooks';
import ViewForm from '@/components/view-form';
import ChunksCombobox from '@/components/chunks-combobox';

type Props = {
  town: Town;
};

export default function ViewTownChunksForm(props: Props) {
  const t = useTranslations();

  const chunks = useSelectTownChunks(props.town.id);

  return (
    <ViewForm>
      <ChunksCombobox
        data={chunks.data}
        loading={chunks.isLoading}
        placeholder={t('columns.chunks')}
        value={0}
        setValue={() => {}}
      />
    </ViewForm>
  );
}
