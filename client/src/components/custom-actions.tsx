'use client';

import { useTranslations } from 'next-intl';
import {
  Button,
  ButtonGroup,
  IconButton,
  Menu,
  Portal,
} from '@chakra-ui/react';
import { LuEllipsis } from 'react-icons/lu';
import { useAuthContext } from '@/providers/auth-provider';
import { useDialogContext } from '@/providers/dialog-provider';
import AuthFormWithTabs from '@/features/auth/forms/auth-form-with-tabs';
import { Color } from '@/constants/colors';

type Props = {
  actions: {
    button?: true;
    danger?: true;
    number?: number;
    action: string;
    dialog: string;
    color?: Color;
    disabled?: boolean;
    userId?: number;
    icon: React.ReactNode;
    body: React.ReactNode;
  }[];
};

export default function CustomActions(props: Props) {
  const t = useTranslations();

  const { user } = useAuthContext();

  const { openDialog } = useDialogContext();

  const openActionDialog = (
    action: string,
    dialog: string,
    body: React.ReactNode,
  ) =>
    openDialog({
      title: t(`actions.${action}`) + ' ' + t(`dialogs.${dialog}`),
      body,
    });

  const openAuthDialog = () =>
    openDialog({ title: t('dialogs.login'), body: <AuthFormWithTabs /> });

  const actions = props.actions.map((action) => ({
    ...action,
    disabled:
      action.disabled || (!!action.userId && action.userId !== user?.id),
    onClick:
      user || action.action === 'view'
        ? () => openActionDialog(action.action, action.dialog, action.body)
        : openAuthDialog,
  }));

  const buttons = actions.filter((action) => action.button);

  const items = actions.filter((action) => !action.button);

  return (
    <ButtonGroup size='2xs' variant='ghost'>
      {buttons.map((button) => (
        <Button
          key={button.number != undefined ? button.dialog : button.action}
          colorPalette={button.color}
          disabled={button.disabled}
          onClick={button.onClick}
        >
          {button.icon}
          {button.number ?? t(`actions.${button.action}`)}
        </Button>
      ))}
      <Menu.Root positioning={{ placement: 'bottom-end' }}>
        <Menu.Trigger asChild focusRing='none'>
          <IconButton>
            <LuEllipsis />
          </IconButton>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              {items.map((item) => (
                <Menu.Item
                  key={item.action}
                  value={item.action}
                  color={item.danger && 'fg.error'}
                  _hover={item.danger && { bg: 'bg.error', color: 'fg.error' }}
                  disabled={item.disabled}
                  onSelect={item.onClick}
                >
                  {item.icon}
                  {t(`actions.${item.action}`) +
                    ' ' +
                    t(`dialogs.${item.dialog}`)}
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </ButtonGroup>
  );
}
