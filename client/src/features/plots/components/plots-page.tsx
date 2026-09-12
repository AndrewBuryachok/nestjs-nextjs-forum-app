import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import PlotsTable from './plots-table';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.plots;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function PlotsPage(props: Props) {
  return (
    <CustomPage
      page='plots'
      tab={props.tab}
      table={<PlotsTable tab={props.tab} searchParams={props.searchParams} />}
    />
  );
}
