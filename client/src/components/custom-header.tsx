import { Box, Flex, IconButton } from '@chakra-ui/react';
import { LuUser } from 'react-icons/lu';
import CustomContainer from './custom-container';
import NavbarDrawer from './navbar-drawer';

export default function CustomHeader() {
  return (
    <Box as='header' bg='bg' position='sticky' top='0' zIndex='sticky'>
      <CustomContainer>
        <Flex justify='space-between'>
          <NavbarDrawer />
          <IconButton size='xs' variant='ghost'>
            <LuUser />
          </IconButton>
        </Flex>
      </CustomContainer>
    </Box>
  );
}
