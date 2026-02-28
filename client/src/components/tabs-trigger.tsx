'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Tabs } from '@chakra-ui/react';
import { useAuthContext } from '@/providers/auth-provider';
import { canAccess } from '@/lib/can-access';
import { Role } from '@/constants/roles';

type Props = {
  page: string;
  tab: string;
  roles: Role[];
};

export default function TabsTrigger(props: Props) {
  const t = useTranslations();

  const { user } = useAuthContext();

  const disabled = !canAccess(props.roles, user?.roles);

  return disabled ? (
    <Tabs.Trigger disabled value={props.tab}>
      {t(`tabs.${props.tab}`)}
    </Tabs.Trigger>
  ) : (
    <Tabs.Trigger asChild value={props.tab}>
      <Link href={`/${props.page}/${props.tab}`}>{t(`tabs.${props.tab}`)}</Link>
    </Tabs.Trigger>
  );
}
