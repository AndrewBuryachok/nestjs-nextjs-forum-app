import { Box } from '@chakra-ui/react';
import NavbarDrawer from './navbar-drawer';
import AuthMenu from './auth-menu';
import CustomZoomPanPinch from './custom-zoom-pan-pinch';

type Props = {
  children: React.ReactNode;
};

export default function SvgLayout(props: Props) {
  return (
    <Box as='main'>
      <Box position='absolute' top='4' left='4' zIndex='sticky'>
        <NavbarDrawer />
      </Box>
      <Box position='absolute' top='4' right='4' zIndex='sticky'>
        <AuthMenu />
      </Box>
      <CustomZoomPanPinch>
        <svg height='100dvh' width='100dvw'>
          {props.children}
        </svg>
      </CustomZoomPanPinch>
    </Box>
  );
}
