import { PAGE_TABS_MAP } from '@/config/navigation';
import { Invoice } from '../types';
import CustomTable from '@/components/custom-table';
import CustomAvatarWithCard from '@/components/custom-avatar-with-card';
import CustomAvatarWithUser from '@/components/custom-avatar-with-user';
import CurrencyText from '@/components/currency-text';
import CustomText from '@/components/custom-text';
import DateText from '@/components/date-text';
import InvoicesActions from './invoices-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.invoices;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function InvoicesTable(props: Props) {
  return (
    <CustomTable<Invoice>
      page='invoices'
      tab={props.tab}
      searchParams={props.searchParams}
      columns={[
        {
          value: 'sender',
          render: (invoice) => (
            <CustomAvatarWithCard
              user={invoice.senderUser}
              card={invoice.senderCard}
            />
          ),
        },
        {
          value: 'receiver',
          render: (invoice) =>
            invoice.receiverCard ? (
              <CustomAvatarWithCard
                user={invoice.receiverUser}
                card={invoice.receiverCard}
              />
            ) : (
              <CustomAvatarWithUser user={invoice.receiverUser} />
            ),
        },
        {
          value: 'sum',
          render: (invoice) => <CurrencyText value={invoice.sum} />,
        },
        {
          value: 'description',
          render: (invoice) => (
            <CustomText muted value={invoice.description || '-'} />
          ),
        },
        {
          value: 'paid',
          render: (invoice) =>
            invoice.paidAt ? (
              <DateText value={invoice.paidAt} />
            ) : (
              <CustomText muted value='-' />
            ),
        },
        {
          value: 'actions',
          render: (invoice) => (
            <InvoicesActions tab={props.tab} invoice={invoice} />
          ),
        },
      ]}
    />
  );
}
