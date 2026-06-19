import { useTranslations } from 'next-intl';
import { IconButton } from '@chakra-ui/react';
import { LuMenu } from 'react-icons/lu';
import CustomDrawer from './custom-drawer';
import CustomNavbar from './custom-navbar';

export default function NavbarDrawer() {
  const t = useTranslations();

  return (
    <CustomDrawer
      placement='start'
      title={t('drawers.navbar.title')}
      body={<CustomNavbar />}
    >
      <IconButton size='xs' variant='ghost'>
        <LuMenu />
      </IconButton>
    </CustomDrawer>
  );
}
