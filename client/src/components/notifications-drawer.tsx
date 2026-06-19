import { IconButton } from '@chakra-ui/react';
import { LuBell } from 'react-icons/lu';
import NotificationsCircle from './notifications-circle';

export default function NotificationsDrawer() {
  return (
    <IconButton>
      <LuBell />
      <NotificationsCircle />
    </IconButton>
  );
}
