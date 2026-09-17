'use client';

import { useTranslations } from 'next-intl';
import { IconButton } from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';
import { useDialogContext } from '@/providers/dialog-provider';
import SearchForm from './search-form';

export default function SearchButton() {
  const t = useTranslations();

  const { openDialog } = useDialogContext();

  const onClick = () =>
    openDialog({ title: t('dialogs.search'), body: <SearchForm /> });

  return (
    <IconButton onClick={onClick}>
      <LuSearch />
    </IconButton>
  );
}
