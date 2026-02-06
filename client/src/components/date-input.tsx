'use client';

import { useEffect, useState } from 'react';
import { Input, Skeleton } from '@chakra-ui/react';

type Props = {
  value: Date;
};

export default function DateInput(props: Props) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const value = new Date(props.value);
    setDate(value.toLocaleDateString('uk'));
    setTime(value.toLocaleTimeString('uk'));
  }, [props.value]);

  if (!date || !time) {
    return <Skeleton h='10' w='full' />;
  }

  return <Input readOnly value={date + ' ' + time} />;
}
