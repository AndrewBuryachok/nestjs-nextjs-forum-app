'use client';

import { useMqttContext } from '@/providers/mqtt-provider';
import FloatCircle from './float-circle';

type Props = {
  userId: number;
};

export default function UsersCircle(props: Props) {
  const { users, isLoading } = useMqttContext();

  return (
    <FloatCircle isGreen={users.has(props.userId)} isLoading={isLoading} />
  );
}
