import { Skeleton } from '@chakra-ui/react';
import GalleryWrapper from './gallery-wrapper';
import PaginationSkeleton from './pagination-skeleton';
import { GALLERY_PAGE_SIZE } from '@/constants/pagination';

export default function GallerySkeleton() {
  return (
    <>
      <GalleryWrapper>
        {Array.from({ length: GALLERY_PAGE_SIZE }).map((_, i) => (
          <Skeleton key={i} h='40' />
        ))}
      </GalleryWrapper>
      <PaginationSkeleton />
    </>
  );
}
