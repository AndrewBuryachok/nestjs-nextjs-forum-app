import { ButtonGroup } from '@chakra-ui/react';
import ThemeButton from './theme-button';
import AuthMenu from './auth-menu';

export default function HeaderButtons() {
  return (
    <ButtonGroup size='xs' variant='ghost'>
      <ThemeButton />
      <AuthMenu />
    </ButtonGroup>
  );
}
