import { PAGE_TABS_MAP } from '@/config/navigation';
import { Transaction } from '../types';
import { viewTransactionAction } from '../actions/view-transaction-action';
import { deleteTransactionAction } from '../actions/delete-transaction-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.transactions;
  transaction: Transaction;
};

export default function TransactionsActions(props: Props) {
  const actions = {
    my: [],
    all: [deleteTransactionAction],
  }[props.tab];

  return (
    <CustomActions
      actions={[viewTransactionAction, ...actions].map((action) =>
        action(props.transaction),
      )}
    />
  );
}
