import { useTranslations } from 'next-intl';
import { CloseButton, Drawer, IconButton, Portal } from '@chakra-ui/react';
import { LuMenu } from 'react-icons/lu';
import CustomNavbar from './custom-navbar';

export default function NavbarDrawer() {
  const t = useTranslations();

  return (
    <Drawer.Root placement='start'>
      <Drawer.Trigger asChild>
        <IconButton size='xs' variant='ghost'>
          <LuMenu />
        </IconButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>{t('drawers.navbar.title')}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <CustomNavbar />
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size='xs' />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
