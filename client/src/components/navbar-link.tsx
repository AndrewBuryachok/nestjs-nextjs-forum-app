'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button, HStack, useDrawerContext } from '@chakra-ui/react';
import { LuChevronDown, LuChevronRight, LuDot } from 'react-icons/lu';

type Props = {
  value: string;
  icon: React.ReactNode;
  links?: { value: string; my?: boolean }[];
};

export default function NavbarLink(props: Props) {
  const t = useTranslations();

  const [open, setOpen] = useState(false);

  const page = usePathname().split('/')[1];

  const { setOpen: setDrawerOpen } = useDrawerContext();

  const closeDrawer = () => setDrawerOpen(false);

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
            onClick={closeDrawer}
          >
            <Link href={`/${link.value}${link.my ? '/my' : ''}`}>
              <HStack>
                <LuDot />
                {t(`pages.${link.value}`)}
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
      onClick={closeDrawer}
    >
      <Link href={`/${props.value}`}>
        <HStack>
          {props.icon}
          {t(`pages.${props.value}`)}
        </HStack>
      </Link>
    </Button>
  );
}
