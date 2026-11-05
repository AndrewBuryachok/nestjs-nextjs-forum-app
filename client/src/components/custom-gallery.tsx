import { Fragment } from 'react';
import { PAGE_TABS_MAP } from '@/config/navigation';
import { Data } from '@/types/data';
import { requestSchema } from '@/types/request';
import { get } from '@/lib/api';
import GalleryWrapper from './gallery-wrapper';
import PaginationText from './pagination-text';
import CustomEmptyState from './custom-empty-state';
import CustomPagination from './custom-pagination';

type Props<T> = {
  page: keyof typeof PAGE_TABS_MAP;
  tab: string;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  render: (value: T) => React.ReactNode;
};

export default async function CustomGallery<T extends Data>(props: Props<T>) {
  const route = `/${props.page}/${props.tab}`.replace('/main', '');

  const searchParams = await props.searchParams;

  const req = requestSchema.parse(searchParams);

  const res = await get<T>(route, req);

  return (
    <>
      <GalleryWrapper>
        {res.data.map((value) => (
          <Fragment key={value.id}>{props.render(value)}</Fragment>
        ))}
      </GalleryWrapper>
      {res.data.length ? (
        <PaginationText page={req.page} total={res.total} />
      ) : (
        <CustomEmptyState page={props.page} />
      )}
      <CustomPagination page={req.page} total={res.total} />
    </>
  );
}
