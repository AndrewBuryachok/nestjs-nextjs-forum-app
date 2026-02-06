import { PAGE_TABS_MAP } from '@/config/navigation';
import { Transaction } from '../types';
import { viewTransactionAction } from '../actions/view-transaction-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.transactions;
  transaction: Transaction;
};

export default function TransactionsActions(props: Props) {
  return (
    <CustomActions
      actions={[viewTransactionAction].map((action) =>
        action(props.transaction),
      )}
    />
  );
}
