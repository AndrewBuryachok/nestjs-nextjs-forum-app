import { useTranslations } from 'next-intl';
import { IconButton } from '@chakra-ui/react';
import { LuBell } from 'react-icons/lu';
import CustomDrawer from './custom-drawer';
import NotificationsTimeline from './notifications-timeline';
import NotificationsCircle from './notifications-circle';

export default function NotificationsDrawer() {
  const t = useTranslations();

  return (
    <CustomDrawer
      placement='end'
      title={t('drawers.notifications.title')}
      body={<NotificationsTimeline />}
    >
      <IconButton size='xs' variant='ghost'>
        <LuBell />
        <NotificationsCircle />
      </IconButton>
    </CustomDrawer>
  );
}
