import { useTranslations } from 'next-intl';
import { IconButton, Stack } from '@chakra-ui/react';
import { LuBell } from 'react-icons/lu';
import CustomDrawer from './custom-drawer';
import NotificationsSwitch from './notifications-switch';
import NotificationsTabs from './notifications-tabs';
import NotificationsCircle from './notifications-circle';

export default function NotificationsDrawer() {
  const t = useTranslations();

  return (
    <CustomDrawer
      placement='end'
      title={t('drawers.notifications.title')}
      body={
        <Stack>
          <NotificationsSwitch />
          <NotificationsTabs />
        </Stack>
      }
    >
      <IconButton>
        <LuBell />
        <NotificationsCircle />
      </IconButton>
    </CustomDrawer>
  );
}
