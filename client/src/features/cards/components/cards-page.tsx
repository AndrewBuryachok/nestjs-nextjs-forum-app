import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import CardsTable from './cards-table';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.cards;
};

export default function CardsPage(props: Props) {
  return (
    <CustomPage
      page='cards'
      tab={props.tab}
      table={<CardsTable tab={props.tab} />}
    />
  );
}
