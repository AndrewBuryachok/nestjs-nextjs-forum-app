import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import PurchasesTable from './purchases-table';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.purchases;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function PurchasesPage(props: Props) {
  return (
    <CustomPage
      page='purchases'
      tab={props.tab}
      table={
        <PurchasesTable tab={props.tab} searchParams={props.searchParams} />
      }
    />
  );
}
