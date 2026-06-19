'use client';

import { useMqttContext } from '@/providers/mqtt-provider';
import FloatCircle from './float-circle';

export default function NotificationsCircle() {
  const { notifications, isLoading } = useMqttContext();

  if (!notifications.size && !isLoading) {
    return null;
  }

  return <FloatCircle isLoading={isLoading} />;
}
