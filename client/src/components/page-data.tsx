import { PAGE_TABS_MAP } from '@/config/navigation';
import { requestSchema } from '@/types/request';
import { get } from '@/lib/api';
import PaginationText from './pagination-text';
import CustomEmptyState from './custom-empty-state';
import CustomPagination from './custom-pagination';

type Props<T> = {
  page: keyof typeof PAGE_TABS_MAP;
  tab: string;
  take: number;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  render: (data: T[]) => React.ReactNode;
};

export default async function PageData<T>(props: Props<T>) {
  const route = `/${props.page}/${props.tab}`.replace('/main', '');

  const searchParams = await props.searchParams;

  const req = requestSchema.parse(searchParams);

  const res = await get<T>(route, req, props.take);

  return (
    <>
      {props.render(res.data)}
      {res.data.length ? (
        <PaginationText page={req.page} take={props.take} total={res.total} />
      ) : (
        <CustomEmptyState page={props.page} />
      )}
      <CustomPagination page={req.page} take={props.take} total={res.total} />
    </>
  );
}
