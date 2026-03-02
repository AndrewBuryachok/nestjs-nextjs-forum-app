import { ScrollArea, Stack } from '@chakra-ui/react';
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
      links: [{ value: 'shops' }],
    },
    { value: 'users', icon: <LuUsers /> },
  ];

  return (
    <ScrollArea.Root>
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <Stack>
            {links.map((link) => (
              <NavbarLink key={link.value} {...link} />
            ))}
          </Stack>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  );
}
