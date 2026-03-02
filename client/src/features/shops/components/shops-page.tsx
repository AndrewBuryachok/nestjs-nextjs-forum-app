import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import ShopsTable from './shops-table';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.shops;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function ShopsPage(props: Props) {
  return (
    <CustomPage
      page='shops'
      tab={props.tab}
      table={<ShopsTable tab={props.tab} searchParams={props.searchParams} />}
    />
  );
}
