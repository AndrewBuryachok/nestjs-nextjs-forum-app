import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import LockersTable from './lockers-table';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.lockers;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function LockersPage(props: Props) {
  return (
    <CustomPage
      page='lockers'
      tab={props.tab}
      table={<LockersTable tab={props.tab} searchParams={props.searchParams} />}
    />
  );
}
