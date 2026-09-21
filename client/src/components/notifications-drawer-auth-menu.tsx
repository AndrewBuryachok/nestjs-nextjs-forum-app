import { ButtonGroup } from '@chakra-ui/react';
import ThemeButton from './theme-button';
import NotificationsDrawer from './notifications-drawer';
import AuthMenu from './auth-menu';

export default function NotificationsDrawerAuthMenu() {
  return (
    <ButtonGroup size='xs' variant='ghost'>
      <ThemeButton />
      <NotificationsDrawer />
      <AuthMenu />
    </ButtonGroup>
  );
}
