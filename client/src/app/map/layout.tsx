import { Box } from '@chakra-ui/react';
import NavbarDrawer from '@/components/navbar-drawer';
import NotificationsDrawerAuthMenu from '@/components/notifications-drawer-auth-menu';
import CustomZoomPanPinch from '@/components/custom-zoom-pan-pinch';
import {
  PLACE_X_MAX,
  PLACE_X_MIN,
  PLACE_Y_MAX,
  PLACE_Y_MIN,
} from '@/constants/place';

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  const size = 'max(100dvw,100dvh)';

  const viewBox = `${PLACE_X_MIN} ${PLACE_Y_MIN} ${PLACE_X_MAX - PLACE_X_MIN} ${PLACE_Y_MAX - PLACE_Y_MIN}`;

  return (
    <Box as='main'>
      <Box position='absolute' top='4' left='4' zIndex='sticky'>
        <NavbarDrawer />
      </Box>
      <Box position='absolute' top='4' right='4' zIndex='sticky'>
        <NotificationsDrawerAuthMenu />
      </Box>
      <CustomZoomPanPinch>
        <svg style={{ height: size, width: size }} viewBox={viewBox}>
          {props.children}
        </svg>
      </CustomZoomPanPinch>
    </Box>
  );
}
