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
        { value: 'owner', render: (card) => card.user.nick },
        { value: 'card', render: (card) => card.name },
        { value: 'balance', render: (card) => card.balance },
        {
          value: 'created',
          render: (card) => card.createdAt.toString(),
        },
      ]}
    />
  );
}
