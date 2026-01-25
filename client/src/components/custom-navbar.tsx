import { Stack } from '@chakra-ui/react';
import { LuWallet } from 'react-icons/lu';
import NavbarLink from './navbar-link';

export default function CustomNavbar() {
  const links = [
    {
      value: 'wallet',
      icon: <LuWallet />,
      links: [
        { value: 'cards', my: true },
        { value: 'transactions', my: true },
      ],
    },
  ];

  return (
    <Stack>
      {links.map((link) => (
        <NavbarLink key={link.value} {...link} />
      ))}
    </Stack>
  );
}
