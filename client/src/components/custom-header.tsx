import { Box, Container, Flex } from '@chakra-ui/react';
import NavbarDrawer from './navbar-drawer';
import HeaderButtons from './header-buttons';

export default function CustomHeader() {
  return (
    <Box as='header' bg='bg' position='sticky' top='0' zIndex='sticky'>
      <Container maxW='5xl' p='4'>
        <Flex justify='space-between'>
          <NavbarDrawer />
          <HeaderButtons />
        </Flex>
      </Container>
    </Box>
  );
}
