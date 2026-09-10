import { PAGE_TABS_MAP } from '@/config/navigation';
import { Fine } from '../types';
import CustomTable from '@/components/custom-table';
import CustomAvatarWithCard from '@/components/custom-avatar-with-card';
import CustomAvatarWithUser from '@/components/custom-avatar-with-user';
import CurrencyText from '@/components/currency-text';
import CustomText from '@/components/custom-text';
import DateText from '@/components/date-text';
import FinesActions from './fines-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.fines;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function FinesTable(props: Props) {
  return (
    <CustomTable<Fine>
      page='fines'
      tab={props.tab}
      searchParams={props.searchParams}
      columns={[
        {
          value: 'sender',
          render: (fine) => (
            <CustomAvatarWithCard
              user={fine.senderUser}
              card={fine.senderCard}
            />
          ),
        },
        {
          value: 'receiver',
          render: (fine) =>
            fine.receiverCard ? (
              <CustomAvatarWithCard
                user={fine.receiverUser}
                card={fine.receiverCard}
              />
            ) : (
              <CustomAvatarWithUser user={fine.receiverUser} />
            ),
        },
        {
          value: 'sum',
          render: (fine) => <CurrencyText value={fine.sum} />,
        },
        {
          value: 'description',
          render: (fine) => (
            <CustomText muted value={fine.description || '-'} />
          ),
        },
        {
          value: 'paid',
          render: (fine) =>
            fine.paidAt ? (
              <DateText value={fine.paidAt} />
            ) : (
              <CustomText muted value='-' />
            ),
        },
        {
          value: 'actions',
          render: (fine) => <FinesActions tab={props.tab} fine={fine} />,
        },
      ]}
    />
  );
}
