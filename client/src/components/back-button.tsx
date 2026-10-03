'use client';

import { useRouter } from 'next/navigation';
import { IconButton } from '@chakra-ui/react';
import { LuChevronLeft } from 'react-icons/lu';

export default function BackButton() {
  const router = useRouter();

  return (
    <IconButton size='xs' variant='ghost' onClick={() => router.back()}>
      <LuChevronLeft />
    </IconButton>
  );
}
