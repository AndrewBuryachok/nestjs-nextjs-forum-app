import { PAGE_TABS_MAP } from '@/config/navigation';
import { generateMetadata } from '@/lib/metadata';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.transactions;
};

export function generateTransactionsMetadata(props: Props) {
  return generateMetadata({ page: 'transactions', tab: props.tab });
}
