import { PAGE_TABS_MAP } from '@/config/navigation';
import { Transaction } from '../types';
import CustomGallery from '@/components/custom-gallery';
import TransactionsCard from './transactions-card';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.transactions;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function TransactionsGallery(props: Props) {
  return (
    <CustomGallery<Transaction>
      page='transactions'
      tab={props.tab}
      searchParams={props.searchParams}
      render={(transaction) => (
        <TransactionsCard tab={props.tab} transaction={transaction} />
      )}
    />
  );
}
