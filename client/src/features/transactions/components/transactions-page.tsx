import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import TransactionsTable from './transactions-table';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.transactions;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function TransactionsPage(props: Props) {
  return (
    <CustomPage
      page='transactions'
      tab={props.tab}
      table={
        <TransactionsTable tab={props.tab} searchParams={props.searchParams} />
      }
    />
  );
}
