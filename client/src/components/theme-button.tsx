'use client';

import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react';
import { LuMoon, LuSun } from 'react-icons/lu';
import { useColorMode } from './ui/color-mode';

export default function ThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <ClientOnly fallback={<Skeleton h='8' w='8' />}>
      <IconButton onClick={toggleColorMode}>
        {colorMode === 'light' ? <LuMoon /> : <LuSun />}
      </IconButton>
    </ClientOnly>
  );
}
