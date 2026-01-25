import { Box, Container, Flex, IconButton } from '@chakra-ui/react';
import { LuMenu, LuUser } from 'react-icons/lu';

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
      <Container maxW='5xl' p='4'>
        <Flex justify='space-between'>
          <IconButton size='xs' variant='ghost'>
            <LuMenu />
          </IconButton>
          <IconButton size='xs' variant='ghost'>
            <LuUser />
          </IconButton>
        </Flex>
      </Container>
    </Box>
  );
}
