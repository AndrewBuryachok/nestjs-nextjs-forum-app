import { useTranslations } from 'next-intl';
import { PAGE_TABS_MAP } from '@/config/navigation';
import { Transaction } from '../types';
import CustomTable from '@/components/custom-table';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.transactions;
};

export default function TransactionsTable(props: Props) {
  const t = useTranslations();

  return (
    <CustomTable<Transaction>
      page='transactions'
      tab={props.tab}
      columns={[
        {
          value: 'sender',
          render: (transaction) =>
            transaction.senderUser
              ? transaction.senderUser.nick
              : transaction.executorUser
                ? transaction.executorUser.nick
                : t('bank'),
        },
        {
          value: 'receiver',
          render: (transaction) =>
            transaction.receiverUser
              ? transaction.receiverUser.nick
              : transaction.executorUser
                ? transaction.executorUser.nick
                : t('bank'),
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
