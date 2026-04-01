import { ScrollArea, Stack } from '@chakra-ui/react';
import { LuMailbox, LuStore, LuUsers, LuWallet } from 'react-icons/lu';
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
        { value: 'goods' },
        { value: 'purchases', my: true },
        { value: 'shops' },
      ],
    },
    {
      value: 'mail',
      icon: <LuMailbox />,
      links: [{ value: 'lockers' }],
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
