import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import RentsTable from './rents-table';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.rents;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function RentsPage(props: Props) {
  return (
    <CustomPage
      page='rents'
      tab={props.tab}
      table={<RentsTable tab={props.tab} searchParams={props.searchParams} />}
    />
  );
}
