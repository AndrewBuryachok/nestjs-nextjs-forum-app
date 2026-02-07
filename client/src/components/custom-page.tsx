import { Suspense } from 'react';
import { Flex } from '@chakra-ui/react';
import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomHeading from './custom-heading';
import CustomTabs from './custom-tabs';
import TableSkeleton from './table-skeleton';

type Props = {
  page: keyof typeof PAGE_TABS_MAP;
  tab: string;
  action?: React.ReactNode;
  table: React.ReactNode;
};

export default function CustomPage(props: Props) {
  return (
    <>
      <Flex justify='space-between'>
        <CustomHeading page={props.page} />
        {props.action}
      </Flex>
      <CustomTabs page={props.page} tab={props.tab} />
      <Suspense fallback={<TableSkeleton />}>{props.table}</Suspense>
    </>
  );
}
