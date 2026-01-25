import { Box, Container, Flex, IconButton } from '@chakra-ui/react';
import { LuMenu } from 'react-icons/lu';
import HeaderButtons from './header-buttons';

export default function CustomHeader() {
  return (
    <Box as='header' bg='bg' position='sticky' top='0' zIndex='sticky'>
      <Container maxW='5xl' p='4'>
        <Flex justify='space-between'>
          <IconButton size='xs' variant='ghost'>
            <LuMenu />
          </IconButton>
          <HeaderButtons />
        </Flex>
      </Container>
    </Box>
  );
}
