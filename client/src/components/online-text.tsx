'use client';

import { useTranslations } from 'next-intl';
import { useMqttContext } from '@/providers/mqtt-provider';
import MomentText from './moment-text';

type Props = {
  id: number;
  value: Date;
};

export default function OnlineText(props: Props) {
  const t = useTranslations();

  const { users } = useMqttContext();

  if (users.has(props.id)) {
    return t('columns.online');
  }

  return <MomentText value={props.value} />;
}
