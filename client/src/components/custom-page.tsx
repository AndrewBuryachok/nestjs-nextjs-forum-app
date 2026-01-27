import { Suspense } from 'react';
import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomHeading from './custom-heading';
import CustomTabs from './custom-tabs';
import TableSkeleton from './table-skeleton';

type Props = {
  page: keyof typeof PAGE_TABS_MAP;
  tab: string;
  table: React.ReactNode;
};

export default function CustomPage(props: Props) {
  return (
    <>
      <CustomHeading page={props.page} />
      <CustomTabs page={props.page} tab={props.tab} />
      <Suspense fallback={<TableSkeleton />}>{props.table}</Suspense>
    </>
  );
}
