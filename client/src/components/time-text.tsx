'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@chakra-ui/react';
import CustomText from './custom-text';

type Props = {
  value: Date;
};

export default function TimeText(props: Props) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const value = new Date(props.value);
    setTime(value.toLocaleTimeString('uk'));
  }, [props.value]);

  if (!time) {
    return <Skeleton h='4' w='16' />;
  }

  return <CustomText muted value={time} />;
}
