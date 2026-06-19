import { HStack } from '@chakra-ui/react';
import NotificationsDrawer from './notifications-drawer';
import AuthMenu from './auth-menu';

export default function NotificationsDrawerAuthMenu() {
  return (
    <HStack>
      <NotificationsDrawer />
      <AuthMenu />
    </HStack>
  );
}
