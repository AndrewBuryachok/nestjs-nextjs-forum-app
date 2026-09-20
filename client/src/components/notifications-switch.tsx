'use client';

import { useTranslations } from 'next-intl';
import { Switch } from '@chakra-ui/react';
import { useMqttContext } from '@/providers/mqtt-provider';

export default function NotificationsSwitch() {
  const t = useTranslations();

  const { muted, setMuted } = useMqttContext();

  return (
    <Switch.Root checked={!muted} onCheckedChange={(e) => setMuted(!e.checked)}>
      <Switch.HiddenInput />
      <Switch.Control />
      <Switch.Label>{t('buttons.notificationsSound')}</Switch.Label>
    </Switch.Root>
  );
}
