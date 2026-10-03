import { HStack, Skeleton } from '@chakra-ui/react';

export default function PaginationSkeleton() {
  return (
    <HStack>
      {Array.from({ length: 7 }).map((_, i) => (
        <Skeleton key={i} h='8' w='8' />
      ))}
    </HStack>
  );
}
