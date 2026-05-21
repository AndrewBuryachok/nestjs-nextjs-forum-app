'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext } from './auth-provider';
import { createClient, getMainUsersTopic, publishUser } from '@/lib/mqtt';

type MqttContextType = {
  isLoading: boolean;
  users: Set<number>;
};

const MqttContext = createContext<MqttContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export function MqttProvider(props: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<Set<number>>(new Set());

  const { user } = useAuthContext();

  useEffect(() => {
    setIsLoading(true);
    setUsers(new Set());
    const client = createClient(user?.id);
    client.on('connect', () => {
      client.subscribe(getMainUsersTopic());
      if (user) {
        publishUser(client, user.id, true);
      }
      setIsLoading(false);
    });
    client.on('close', () => {
      setIsLoading(true);
      setUsers(new Set());
    });
    client.on('message', (topic, payload) => {
      const userId = Number(topic.split('/')[2]);
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
    });
    return () => {
      if (user) {
        publishUser(client, user.id, false);
      }
      client.end();
    };
  }, [user?.id]);

  return (
    <MqttContext.Provider value={{ isLoading, users }}>
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
