import { Box, Flex } from '@chakra-ui/react';
import CustomContainer from './custom-container';
import NavbarDrawer from './navbar-drawer';
import AuthMenu from './auth-menu';

export default function CustomHeader() {
  return (
    <Box
      _dark={{ bg: 'black' }}
      _light={{ bg: 'white' }}
      as='header'
      position='sticky'
      top='0'
      zIndex='sticky'
    >
      <CustomContainer>
        <Flex justify='space-between'>
          <NavbarDrawer />
          <AuthMenu />
        </Flex>
      </CustomContainer>
    </Box>
  );
}
