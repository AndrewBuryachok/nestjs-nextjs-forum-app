'use client';

import { Circle, Float } from '@chakra-ui/react';
import { useMqttContext } from '@/providers/mqtt-provider';
import { Color } from '@/constants/colors';

type Props = {
  userId: number;
};

export default function OnlineCircle(props: Props) {
  const { users, isLoading } = useMqttContext();

  const online = users.has(props.userId);

  const bg = `${online ? Color.GREEN : Color.RED}.500`;

  return (
    <Float>
      <Circle bg={isLoading ? 'fg.muted' : bg} size='2' />
    </Float>
  );
}
