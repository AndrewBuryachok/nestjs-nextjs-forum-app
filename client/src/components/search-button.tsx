import { IconButton } from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';

export default function SearchButton() {
  return (
    <IconButton size='xs' variant='ghost'>
      <LuSearch />
    </IconButton>
  );
}
