import { PAGE_TABS_MAP } from '@/config/navigation';
import { Card } from '../types';
import CustomTable from '@/components/custom-table';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.cards;
};

export default function CardsTable(props: Props) {
  return (
    <CustomTable<Card>
      page='cards'
      tab={props.tab}
      columns={[
        { value: 'owner', render: (card) => card.account.user.nick },
        { value: 'card', render: (card) => card.account.name },
        { value: 'balance', render: (card) => card.account.balance },
        {
          value: 'created',
          render: (card) => card.account.createdAt.toString(),
        },
      ]}
    />
  );
}
