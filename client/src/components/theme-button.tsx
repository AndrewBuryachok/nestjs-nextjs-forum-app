'use client';

import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react';
import { LuMoon, LuSun } from 'react-icons/lu';
import { useColorMode } from '@/components/ui/color-mode';

export default function ThemeButton() {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <ClientOnly fallback={<Skeleton h='8' w='8' />}>
      <IconButton onClick={toggleColorMode}>
        {colorMode === 'light' ? <LuSun /> : <LuMoon />}
      </IconButton>
    </ClientOnly>
  );
}
