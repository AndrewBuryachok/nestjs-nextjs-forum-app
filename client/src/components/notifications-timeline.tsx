'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  Button,
  ButtonGroup,
  HStack,
  Skeleton,
  SkeletonText,
  Stack,
  Timeline,
  useDrawerContext,
} from '@chakra-ui/react';
import { useMqttContext } from '@/providers/mqtt-provider';
import CustomEmptyState from './custom-empty-state';
import CustomSeparator from './custom-separator';
import NotificationAvatar from './notification-avatar';
import NotificationNick from './notification-nick';
import CustomText from './custom-text';
import { parseNotification } from '@/lib/notifications';

type Props = {
  notifications: Map<string, Date>;
};

export default function NotificationsTimeline(props: Props) {
  const t = useTranslations();

  const { setOpen: setDrawerOpen } = useDrawerContext();

  const closeDrawer = () => setDrawerOpen(false);

  const { isLoading, clearNotification } = useMqttContext();

  const clearAll = () => props.notifications.keys().forEach(clearNotification);

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
              <HStack>
                <Skeleton h='8' w='24' />
                <Skeleton h='8' w='24' />
              </HStack>
            </Timeline.Content>
          </Timeline.Item>
        ))}
      </Timeline.Root>
    );
  }

  if (!props.notifications.size) {
    return <CustomEmptyState page='notifications' />;
  }

  const parsedNotifications = Array.from(props.notifications.entries())
    .map(([key, date]) => parseNotification(key, date))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const groupedNotifications = Object.entries(
    Object.groupBy(parsedNotifications, (n) => n.date.toLocaleDateString('uk')),
  );

  return (
    <Stack>
      <Button colorPalette='red' size='xs' variant='ghost' onClick={clearAll}>
        {t('buttons.markAllAsRead')}
      </Button>
      {groupedNotifications.map(([key, value]) => (
        <Fragment key={key}>
          <CustomSeparator value={key} />
          <Timeline.Root>
            {value?.map((n) => (
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
                  <ButtonGroup size='xs' variant='ghost'>
                    <Button asChild colorPalette='blue' onClick={closeDrawer}>
                      <Link href={n.link}>{t('actions.view')}</Link>
                    </Button>
                    <Button
                      colorPalette='red'
                      onClick={() => clearNotification(n.key)}
                    >
                      {t('actions.delete')}
                    </Button>
                  </ButtonGroup>
                </Timeline.Content>
              </Timeline.Item>
            ))}
          </Timeline.Root>
        </Fragment>
      ))}
    </Stack>
  );
}
