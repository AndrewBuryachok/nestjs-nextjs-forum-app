'use client';

import { useTranslations } from 'next-intl';
import { Skeleton } from '@chakra-ui/react';
import { useSelectOneUser } from '@/features/users/hooks';

type Props = {
  userId: number;
};

export default function NotificationNick(props: Props) {
  const t = useTranslations();

  if (!props.userId) {
    return t('system');
  }

  const { data: user, isLoading } = useSelectOneUser(props.userId);

  if (isLoading) {
    return <Skeleton h='4' w='16' />;
  }

  if (!user) {
    return t('someone');
  }

  return user.nick;
}
