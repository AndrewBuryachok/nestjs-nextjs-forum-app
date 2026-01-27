import { PAGE_TABS_MAP } from '@/config/navigation';
import { Card } from '../types';
import CustomTable from '@/components/custom-table';
import CustomAvatarWithUser from '@/components/custom-avatar-with-user';
import CustomText from '@/components/custom-text';
import CurrencyText from '@/components/currency-text';
import DateText from '@/components/date-text';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.cards;
};

export default function CardsTable(props: Props) {
  return (
    <CustomTable<Card>
      page='cards'
      tab={props.tab}
      columns={[
        {
          value: 'owner',
          render: (card) => <CustomAvatarWithUser user={card.account.user} />,
        },
        {
          value: 'card',
          render: (card) => <CustomText value={card.account.name} />,
        },
        {
          value: 'balance',
          render: (card) => <CurrencyText value={card.account.balance} />,
        },
        {
          value: 'created',
          render: (card) => <DateText value={card.account.createdAt} />,
        },
      ]}
    />
  );
}
