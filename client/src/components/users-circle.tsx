'use client';

import { Circle, Float } from '@chakra-ui/react';
import { useMqttContext } from '@/providers/mqtt-provider';

type Props = {
  userId: number;
};

export default function UsersCircle(props: Props) {
  const { users, isLoading } = useMqttContext();

  const bg = users.has(props.userId) ? 'green.500' : 'red.500';

  return (
    <Float>
      <Circle bg={isLoading ? 'fg.muted' : bg} size='2' />
    </Float>
  );
}
