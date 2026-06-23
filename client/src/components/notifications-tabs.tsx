'use client';

import { useMqttContext } from '@/providers/mqtt-provider';
import TabsWrapper from './tabs-wrapper';
import NotificationsBadge from './notifications-badge';
import NotificationsTimeline from './notifications-timeline';

export default function NotificationsTabs() {
  const tabs = ['public', 'my'];

  const { notifications } = useMqttContext();

  const groupedNotifications = tabs.map(
    (_, i) =>
      new Map(
        [...notifications].filter(
          ([key]) => !!Number(key.split('/')[0]) === !!i,
        ),
      ),
  );

  return (
    <TabsWrapper
      label='tabs'
      value={tabs}
      end={(index) => (
        <NotificationsBadge value={groupedNotifications[index].size} />
      )}
      render={(index) => (
        <NotificationsTimeline notifications={groupedNotifications[index]} />
      )}
    />
  );
}
