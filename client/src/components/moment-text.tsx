'use client';

import { useEffect, useState } from 'react';
import { useFormatter, useNow } from 'next-intl';

type Props = {
  value: Date;
};

export default function MomentText(props: Props) {
  const [value, setValue] = useState('');

  const format = useFormatter();

  const now = useNow();

  useEffect(() => {
    const date = new Date(props.value);
    setValue(format.relativeTime(date, now));
  }, [props.value]);

  return value;
}
