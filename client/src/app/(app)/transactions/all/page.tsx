import { generateTransactionsMetadata } from '@/features/transactions/metadata';
import TransactionsPage from '@/features/transactions/components/transactions-page';

export function generateMetadata() {
  return generateTransactionsMetadata({ tab: 'all' });
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Page(props: Props) {
  return <TransactionsPage tab='all' searchParams={props.searchParams} />;
}
