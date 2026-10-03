'use client';

import { Fragment, useEffect, useRef } from 'react';
import { Card, Stack, Timeline } from '@chakra-ui/react';
import { ComplaintWithMessages } from '../types';
import { useAuthContext } from '@/providers/auth-provider';
import CustomSeparator from '@/components/custom-separator';
import CustomAvatar from '@/components/custom-avatar';
import TimeText from '@/components/time-text';

type Props = {
  complaint: ComplaintWithMessages;
};

export default function ComplaintsTimeline(props: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, []);

  const { user } = useAuthContext();

  const messages = Object.entries(
    Object.groupBy(props.complaint.messages, (message) =>
      new Date(message.createdAt).toLocaleDateString('ru'),
    ),
  );

  return (
    <Stack>
      {messages.map(([key, value]) => (
        <Fragment key={key}>
          <CustomSeparator value={key} />
          <Timeline.Root>
            {value?.map((message) => (
              <Timeline.Item
                key={message.id}
                flexDirection={
                  message.user.id === user?.id ? 'row-reverse' : 'row'
                }
              >
                <Timeline.Connector>
                  <CustomAvatar
                    user={message.user}
                    withoutCircle={message.user.id === user?.id}
                  />
                </Timeline.Connector>
                <Timeline.Content
                  alignItems={
                    message.user.id === user?.id ? 'flex-end' : 'flex-start'
                  }
                >
                  <Timeline.Title
                    flexDirection={
                      message.user.id === user?.id ? 'row-reverse' : 'row'
                    }
                  >
                    {message.user.nick}
                    <TimeText value={message.createdAt} />
                  </Timeline.Title>
                  <Card.Root
                    size='sm'
                    variant='subtle'
                    w='fit-content'
                    maxW='xs'
                  >
                    <Card.Body>
                      <Card.Description>{message.text}</Card.Description>
                    </Card.Body>
                  </Card.Root>
                </Timeline.Content>
              </Timeline.Item>
            ))}
          </Timeline.Root>
        </Fragment>
      ))}
      <div ref={ref} />
    </Stack>
  );
}
