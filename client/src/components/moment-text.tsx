'use client';

import { useFormatter, useNow } from 'next-intl';

type Props = {
  value: Date;
};

export default function MomentText(props: Props) {
  const format = useFormatter();

  const now = useNow();

  const value = new Date(props.value);

  return format.relativeTime(value, now);
}
