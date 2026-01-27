'use client';

import { useEffect, useState } from 'react';
import { SkeletonText } from '@chakra-ui/react';
import CustomText from './custom-text';

type Props = {
  value: Date;
};

export default function DateText(props: Props) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const value = new Date(props.value);
    setDate(value.toLocaleDateString('uk'));
    setTime(value.toLocaleTimeString('uk'));
  }, [props.value]);

  if (!date || !time) {
    return <SkeletonText noOfLines={2} />;
  }

  return (
    <div>
      <CustomText value={date} />
      <CustomText muted value={time} />
    </div>
  );
}
