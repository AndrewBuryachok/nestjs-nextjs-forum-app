import { PAGE_TABS_MAP } from '@/config/navigation';
import { Transaction } from '../types';
import CustomTable from '@/components/custom-table';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.transactions;
};

export default function TransactionsTable(props: Props) {
  return (
    <CustomTable<Transaction>
      page='transactions'
      tab={props.tab}
      columns={[
        {
          value: 'sender',
          render: (transaction) =>
            transaction.senderCard?.user.nick ?? transaction.executorUser!.nick,
        },
        {
          value: 'receiver',
          render: (transaction) =>
            transaction.receiverCard?.user.nick ??
            transaction.executorUser!.nick,
        },
        { value: 'sum', render: (transaction) => transaction.sum },
        {
          value: 'description',
          render: (transaction) => transaction.description || '-',
        },
        {
          value: 'created',
          render: (transaction) => transaction.createdAt.toString(),
        },
      ]}
    />
  );
}
