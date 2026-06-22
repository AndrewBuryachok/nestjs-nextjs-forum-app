'use client';

import mqtt from 'mqtt';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuthContext } from './auth-provider';
import { toaster } from '@/components/ui/toaster';
import NotificationNick from '@/components/notification-nick';
import {
  createClient,
  getMainUsersTopic,
  getMyNotificationsTopic,
  getPublicNotificationsTopic,
  publishNotification,
  publishUser,
} from '@/lib/mqtt';

type MqttContextType = {
  isLoading: boolean;
  users: Set<number>;
  notifications: Map<string, Date>;
  clearNotification: (key: string) => void;
};

const MqttContext = createContext<MqttContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export function MqttProvider(props: Props) {
  const t = useTranslations();

  const clientRef = useRef<mqtt.MqttClient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<Set<number>>(new Set());
  const [notifications, setNotifications] = useState<Map<string, Date>>(
    new Map(),
  );

  const { user } = useAuthContext();

  useEffect(() => {
    setIsLoading(true);
    setUsers(new Set());
    setNotifications(new Map());
    clientRef.current = createClient(user?.id);
    const client = clientRef.current;
    client.on('connect', () => {
      client.subscribe(getMainUsersTopic());
      client.subscribe(getPublicNotificationsTopic());
      if (user) {
        client.subscribe(getMyNotificationsTopic(user.id));
        publishUser(client, user.id, true);
      }
      setIsLoading(false);
    });
    client.on('offline', () => {
      setIsLoading(true);
      setUsers(new Set());
      setNotifications(new Map());
    });
    client.on('message', (topic, payload, packet) => {
      const parts = topic.split('/');
      const type = parts[1];
      if (type === 'users') {
        const userId = Number(parts[2]);
        setUsers((prev) => {
          const next = new Set(prev);
          if (payload.length) {
            next.add(userId);
          } else {
            next.delete(userId);
          }
          return next;
        });
        if (userId === user?.id && !payload.length) {
          publishUser(client, user.id, true);
        }
      }
      if (type === 'notifications') {
        const notification = parts.slice(2).join('/');
        setNotifications((prev) => {
          const next = new Map(prev);
          if (payload.length) {
            next.set(notification, new Date(payload.toString()));
          } else {
            next.delete(notification);
          }
          return next;
        });
        if (payload.length && !packet.retain) {
          const [page, _, action, userId] = parts.slice(3);
          toaster.info({
            title: <NotificationNick userId={Number(userId)} />,
            description: t(`notifications.${page}.${action}`),
            meta: { userId },
          });
          new Audio('/sound.mp3').play().catch(() => {});
        }
      }
    });
    return () => {
      if (user) {
        publishUser(client, user.id, false);
      }
      client.end();
      clientRef.current = null;
    };
  }, [user?.id]);

  const clearNotification = (key: string) => {
    if (Number(key.split('/')[0])) {
      const client = clientRef.current;
      if (client) {
        publishNotification(client, key);
      }
    } else {
      setNotifications((prev) => {
        const next = new Map(prev);
        next.delete(key);
        return next;
      });
    }
  };

  return (
    <MqttContext.Provider
      value={{ isLoading, users, notifications, clearNotification }}
    >
      {props.children}
    </MqttContext.Provider>
  );
}

export function useMqttContext() {
  const context = useContext(MqttContext);
  if (!context) {
    throw new Error('useMqttContext must be used within a MqttProvider');
  }
  return context;
}
