import { Suspense } from 'react';
import { PAGE_TABS_MAP } from '@/config/navigation';
import { Data } from '@/types/data';
import PageData from './page-data';
import TableData from './table-data';
import TableSkeleton from './table-skeleton';
import { TABLE_PAGE_SIZE } from '@/constants/pagination';

type Props<T> = {
  page: keyof typeof PAGE_TABS_MAP;
  tab: string;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  columns: { value: string; render: (value: T) => React.ReactNode }[];
};

export default function CustomTable<T extends Data>(props: Props<T>) {
  return (
    <Suspense
      fallback={<TableSkeleton columns={props.columns.map((c) => c.value)} />}
    >
      <PageData<T>
        page={props.page}
        tab={props.tab}
        take={TABLE_PAGE_SIZE}
        searchParams={props.searchParams}
        render={(data) => <TableData data={data} columns={props.columns} />}
      />
    </Suspense>
  );
}
