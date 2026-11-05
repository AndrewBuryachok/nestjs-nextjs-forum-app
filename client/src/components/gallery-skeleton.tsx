import {
  Card,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';
import GalleryWrapper from './gallery-wrapper';
import CardWrapper from './card-wrapper';
import { PAGE_SIZE } from '@/constants/pagination';

export default function GallerySkeleton() {
  return (
    <>
      <GalleryWrapper>
        {Array.from({ length: PAGE_SIZE }).map((_, i) => (
          <CardWrapper key={i}>
            <Card.Header>
              <HStack>
                <SkeletonCircle size='8' />
                <SkeletonText noOfLines={2} />
              </HStack>
            </Card.Header>
            <Card.Body>
              <Skeleton h='10' />
            </Card.Body>
            <Card.Footer justifyContent='flex-end'>
              <HStack>
                <Skeleton h='6' w='24' />
                <Skeleton h='6' w='6' />
              </HStack>
            </Card.Footer>
          </CardWrapper>
        ))}
      </GalleryWrapper>
      <HStack>
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} h='8' w='8' />
        ))}
      </HStack>
    </>
  );
}
