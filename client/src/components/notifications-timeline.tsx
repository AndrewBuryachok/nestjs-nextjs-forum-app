'use client';

import { useTranslations } from 'next-intl';
import { Skeleton, SkeletonText, Timeline } from '@chakra-ui/react';
import { useMqttContext } from '@/providers/mqtt-provider';
import CustomEmptyState from './custom-empty-state';
import NotificationAvatar from './notification-avatar';
import NotificationNick from './notification-nick';
import CustomText from './custom-text';
import { parseNotification } from '@/lib/notifications';

export default function NotificationsTimeline() {
  const t = useTranslations();

  const { notifications, isLoading } = useMqttContext();

  if (isLoading) {
    return (
      <Timeline.Root>
        {Array.from({ length: 5 }).map((_, i) => (
          <Timeline.Item key={i}>
            <Timeline.Connector>
              <Skeleton h='8' w='8' />
            </Timeline.Connector>
            <Timeline.Content>
              <SkeletonText noOfLines={2} />
            </Timeline.Content>
          </Timeline.Item>
        ))}
      </Timeline.Root>
    );
  }

  if (!notifications.size) {
    return <CustomEmptyState page='notifications' />;
  }

  const parsedNotifications = Array.from(notifications.entries())
    .map(([key, date]) => parseNotification(key, date))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <Timeline.Root>
      {parsedNotifications.map((n) => (
        <Timeline.Item key={n.key}>
          <Timeline.Connector>
            <NotificationAvatar userId={n.fromUserId} />
          </Timeline.Connector>
          <Timeline.Content>
            <Timeline.Title>
              <NotificationNick userId={n.fromUserId} />
              <CustomText muted value={n.date.toLocaleTimeString('uk')} />
            </Timeline.Title>
            <Timeline.Description>
              {t(`notifications.${n.page}.${n.action}`)}
            </Timeline.Description>
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline.Root>
  );
}
