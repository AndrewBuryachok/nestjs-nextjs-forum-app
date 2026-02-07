'use client';

import { useTranslations } from 'next-intl';
import { IconButton } from '@chakra-ui/react';
import { LuPlus } from 'react-icons/lu';
import { useDialogContext } from '@/providers/dialog-provider';

type Props = {
  action: string;
  dialog: string;
  body: React.ReactNode;
};

export default function CustomAction(props: Props) {
  const t = useTranslations();

  const { openDialog } = useDialogContext();

  return (
    <IconButton
      size='xs'
      variant='ghost'
      onClick={() =>
        openDialog({
          title:
            t(`actions.${props.action}`) + ' ' + t(`dialogs.${props.dialog}`),
          body: props.body,
        })
      }
    >
      <LuPlus />
    </IconButton>
  );
}
