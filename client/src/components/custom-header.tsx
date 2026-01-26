import { Box, Flex } from '@chakra-ui/react';
import CustomContainer from './custom-container';
import NavbarDrawer from './navbar-drawer';
import HeaderButtons from './header-buttons';

export default function CustomHeader() {
  return (
    <Box as='header' bg='bg' position='sticky' top='0' zIndex='sticky'>
      <CustomContainer>
        <Flex justify='space-between'>
          <NavbarDrawer />
          <HeaderButtons />
        </Flex>
      </CustomContainer>
    </Box>
  );
}
