import { Suspense } from 'react';
import { PAGE_TABS_MAP } from '@/config/navigation';
import { Data } from '@/types/data';
import PageData from './page-data';
import GalleryData from './gallery-data';
import GallerySkeleton from './gallery-skeleton';
import { GALLERY_PAGE_SIZE } from '@/constants/pagination';

type Props<T> = {
  page: keyof typeof PAGE_TABS_MAP;
  tab: string;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  render: (value: T) => React.ReactNode;
};

export default function CustomGallery<T extends Data>(props: Props<T>) {
  return (
    <Suspense fallback={<GallerySkeleton />}>
      <PageData<T>
        page={props.page}
        tab={props.tab}
        take={GALLERY_PAGE_SIZE}
        searchParams={props.searchParams}
        render={(data) => <GalleryData data={data} render={props.render} />}
      />
    </Suspense>
  );
}
