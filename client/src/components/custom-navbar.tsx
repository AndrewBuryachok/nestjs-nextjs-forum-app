import { Stack } from '@chakra-ui/react';
import { LuStore, LuUsers, LuWallet } from 'react-icons/lu';
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
    {
      value: 'trade',
      icon: <LuStore />,
      links: [
        { value: 'products' },
        { value: 'purchases', my: true },
        { value: 'shops' },
      ],
    },
    { value: 'users', icon: <LuUsers /> },
  ];

  return (
    <Stack>
      {links.map((link) => (
        <NavbarLink key={link.value} {...link} />
      ))}
    </Stack>
  );
}
