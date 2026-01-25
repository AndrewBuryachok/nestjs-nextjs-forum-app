import { Box, Container, Flex, IconButton } from '@chakra-ui/react';
import { LuUser } from 'react-icons/lu';
import NavbarDrawer from './navbar-drawer';

export default function CustomHeader() {
  return (
    <Box as='header' bg='bg' position='sticky' top='0' zIndex='sticky'>
      <Container maxW='5xl' p='4'>
        <Flex justify='space-between'>
          <NavbarDrawer />
          <IconButton size='xs' variant='ghost'>
            <LuUser />
          </IconButton>
        </Flex>
      </Container>
    </Box>
  );
}
