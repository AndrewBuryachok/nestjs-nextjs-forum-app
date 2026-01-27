import { generateTransactionsMetadata } from '@/features/transactions/metadata';
import TransactionsPage from '@/features/transactions/components/transactions-page';

export function generateMetadata() {
  return generateTransactionsMetadata({ tab: 'my' });
}

export default function Page() {
  return <TransactionsPage tab='my' />;
}
