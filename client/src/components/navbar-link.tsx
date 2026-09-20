'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button, HStack, useDrawerContext } from '@chakra-ui/react';
import { LuChevronDown, LuChevronRight, LuDot } from 'react-icons/lu';
import { useAuthContext } from '@/providers/auth-provider';
import { useMqttContext } from '@/providers/mqtt-provider';
import NotificationsBadge from './notifications-badge';

type Props = {
  value: string;
  icon: React.ReactNode;
  links?: { value: string; my?: boolean }[];
};

export default function NavbarLink(props: Props) {
  const t = useTranslations();

  const [open, setOpen] = useState(false);

  const page = usePathname().split('/')[1];

  const { notifications, clearNotification } = useMqttContext();

  const filterNotifications = (pages: string[]) =>
    [...notifications.keys()].filter((key) =>
      pages.find((k) => k === key.split('/')[1]),
    );

  const { setOpen: setDrawerOpen } = useDrawerContext();

  const onClick = (page: string) => {
    filterNotifications([page]).forEach(clearNotification);
    setDrawerOpen(false);
  };

  const { user } = useAuthContext();

  return props.links ? (
    <>
      <Button
        justifyContent='space-between'
        size='xs'
        variant={
          props.links.find((link) => link.value === page) ? 'subtle' : 'ghost'
        }
        onClick={() => setOpen((open) => !open)}
      >
        <HStack>
          {props.icon}
          {t(`pages.${props.value}`)}
          <NotificationsBadge
            value={
              filterNotifications(props.links.map((link) => link.value)).length
            }
          />
        </HStack>
        {open ? <LuChevronDown /> : <LuChevronRight />}
      </Button>
      {open &&
        props.links.map((link) => (
          <Button
            key={link.value}
            asChild
            justifyContent='flex-start'
            size='xs'
            variant={link.value === page ? 'subtle' : 'ghost'}
            disabled={link.my && !user}
            onClick={() => onClick(link.value)}
          >
            <Link href={`/${link.value}${link.my ? '/my' : ''}`}>
              <HStack>
                <LuDot />
                {t(`pages.${link.value}`)}
                <NotificationsBadge
                  value={filterNotifications([link.value]).length}
                />
              </HStack>
            </Link>
          </Button>
        ))}
    </>
  ) : (
    <Button
      asChild
      justifyContent='flex-start'
      size='xs'
      variant={props.value === page ? 'subtle' : 'ghost'}
      onClick={() => onClick(props.value)}
    >
      <Link href={`/${props.value}`}>
        <HStack>
          {props.icon}
          {t(`pages.${props.value}`)}
          <NotificationsBadge
            value={filterNotifications([props.value]).length}
          />
        </HStack>
      </Link>
    </Button>
  );
}
