import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import MarketsTable from './markets-table';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.markets;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function MarketsPage(props: Props) {
  return (
    <CustomPage
      page='markets'
      tab={props.tab}
      table={<MarketsTable tab={props.tab} searchParams={props.searchParams} />}
    />
  );
}
