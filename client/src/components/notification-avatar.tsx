'use client';

import { Skeleton } from '@chakra-ui/react';
import { LuBell, LuUser } from 'react-icons/lu';
import { useSelectOneUser } from '@/features/users/hooks';
import SquareIcon from './square-icon';
import CustomAvatar from './custom-avatar';

type Props = {
  userId: number;
  withoutCircle?: boolean;
};

export default function NotificationAvatar(props: Props) {
  if (!props.userId) {
    return (
      <SquareIcon>
        <LuBell />
      </SquareIcon>
    );
  }

  const { data: user, isLoading } = useSelectOneUser(props.userId);

  if (isLoading) {
    return <Skeleton h='8' w='8' />;
  }

  if (!user) {
    return (
      <SquareIcon>
        <LuUser />
      </SquareIcon>
    );
  }

  return <CustomAvatar withoutCircle={props.withoutCircle} user={user} />;
}
