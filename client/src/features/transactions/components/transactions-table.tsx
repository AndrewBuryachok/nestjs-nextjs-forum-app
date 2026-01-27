import { PAGE_TABS_MAP } from '@/config/navigation';
import { Transaction } from '../types';
import CustomTable from '@/components/custom-table';
import CustomAvatarWithCard from '@/components/custom-avatar-with-card';
import CustomAvatarWithUser from '@/components/custom-avatar-with-user';
import CurrencyText from '@/components/currency-text';
import CustomText from '@/components/custom-text';
import DateText from '@/components/date-text';

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
            transaction.senderCard ? (
              <CustomAvatarWithCard card={transaction.senderCard} />
            ) : (
              <CustomAvatarWithUser user={transaction.executorUser!} />
            ),
        },
        {
          value: 'receiver',
          render: (transaction) =>
            transaction.receiverCard ? (
              <CustomAvatarWithCard card={transaction.receiverCard} />
            ) : (
              <CustomAvatarWithUser user={transaction.executorUser!} />
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
      ]}
    />
  );
}
