import { PAGE_TABS_MAP } from '@/config/navigation';
import { Transaction } from '../types';
import CustomTable from '@/components/custom-table';
import CustomAvatarWithCard from '@/components/custom-avatar-with-card';
import CustomAvatarWithUser from '@/components/custom-avatar-with-user';
import BankIconWithText from '@/components/bank-icon-with-text';
import CurrencyText from '@/components/currency-text';
import CustomText from '@/components/custom-text';
import DateText from '@/components/date-text';
import TransactionsActions from './transactions-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.transactions;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function TransactionsTable(props: Props) {
  return (
    <CustomTable<Transaction>
      page='transactions'
      tab={props.tab}
      searchParams={props.searchParams}
      columns={[
        {
          value: 'sender',
          render: (transaction) =>
            transaction.senderUser && transaction.senderCard ? (
              <CustomAvatarWithCard
                user={transaction.senderUser}
                card={transaction.senderCard}
              />
            ) : transaction.executorUser ? (
              <CustomAvatarWithUser user={transaction.executorUser} />
            ) : (
              <BankIconWithText />
            ),
        },
        {
          value: 'receiver',
          render: (transaction) =>
            transaction.receiverUser && transaction.receiverCard ? (
              <CustomAvatarWithCard
                user={transaction.receiverUser}
                card={transaction.receiverCard}
              />
            ) : transaction.executorUser ? (
              <CustomAvatarWithUser user={transaction.executorUser} />
            ) : (
              <BankIconWithText />
            ),
        },
        {
          value: 'sum',
          render: (transaction) => <CurrencyText value={transaction.sum} />,
        },
        {
          value: 'description',
          render: (transaction) => (
            <CustomText muted value={transaction.description || '-'} />
          ),
        },
        {
          value: 'created',
          render: (transaction) => <DateText value={transaction.createdAt} />,
        },
        {
          value: 'actions',
          render: (transaction) => (
            <TransactionsActions tab={props.tab} transaction={transaction} />
          ),
        },
      ]}
    />
  );
}
