import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.cards;
};

export default function CardsPage(props: Props) {
  return <CustomPage page='cards' tab={props.tab} />;
}
