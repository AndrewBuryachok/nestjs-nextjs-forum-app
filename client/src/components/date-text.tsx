'use client';

import { useEffect, useState } from 'react';

type Props = {
  value: Date;
};

export default function DateText(props: Props) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const date = new Date(props.value);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    setValue(`${day}.${month} ${hours}:${minutes}`);
  }, [props.value]);

  return value;
}
