'use client';

import { useTranslations } from 'next-intl';
import { ButtonGroup, IconButton } from '@chakra-ui/react';
import { useDialogContext } from '@/providers/dialog-provider';
import { Color } from '@/constants/colors';

type Props = {
  actions: {
    action: string;
    dialog: string;
    color: Color;
    userId?: number;
    icon: React.ReactNode;
    body: React.ReactNode;
  }[];
};

export default function CustomActions(props: Props) {
  const t = useTranslations();

  const { openDialog } = useDialogContext();

  return (
    <ButtonGroup attached size='2xs' variant='plain'>
      {props.actions.map((action) => (
        <IconButton
          key={action.action}
          colorPalette={action.color}
          disabled={!!action.userId && action.userId !== 1}
          onClick={() =>
            openDialog({
              title:
                t(`actions.${action.action}`) +
                ' ' +
                t(`dialogs.${action.dialog}`),
              body: action.body,
            })
          }
        >
          {action.icon}
        </IconButton>
      ))}
    </ButtonGroup>
  );
}
