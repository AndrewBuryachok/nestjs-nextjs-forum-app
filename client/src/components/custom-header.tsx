import { Box, Flex, IconButton } from '@chakra-ui/react';
import { LuMenu, LuUser } from 'react-icons/lu';
import CustomContainer from './custom-container';

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
          <IconButton size='xs' variant='ghost'>
            <LuMenu />
          </IconButton>
          <IconButton size='xs' variant='ghost'>
            <LuUser />
          </IconButton>
        </Flex>
      </CustomContainer>
    </Box>
  );
}
