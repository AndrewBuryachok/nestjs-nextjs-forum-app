import { ButtonGroup, IconButton } from '@chakra-ui/react';
import { LuUser } from 'react-icons/lu';
import ThemeButton from './theme-button';

export default function HeaderButtons() {
  return (
    <ButtonGroup size='xs' variant='ghost'>
      <ThemeButton />
      <IconButton>
        <LuUser />
      </IconButton>
    </ButtonGroup>
  );
}
