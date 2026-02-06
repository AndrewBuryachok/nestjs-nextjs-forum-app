import { Square } from '@chakra-ui/react';
import { LuLandmark } from 'react-icons/lu';

export default function BankIcon() {
  return (
    <Square bg='bg.muted' borderRadius='sm' size='8'>
      <LuLandmark />
    </Square>
  );
}
