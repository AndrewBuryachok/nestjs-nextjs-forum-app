'use client';

import { Float } from '@chakra-ui/react';
import { useMqttContext } from '@/providers/mqtt-provider';
import FloatCircle from './float-circle';
import NotificationsBadge from './notifications-badge';

export default function NotificationsCircle() {
  const { notifications, isLoading } = useMqttContext();

  if (!notifications.size && !isLoading) {
    return null;
  }

  if (isLoading) {
    return <FloatCircle isLoading />;
  }

  return (
    <Float>
      <NotificationsBadge value={notifications.size} />
    </Float>
  );
}
