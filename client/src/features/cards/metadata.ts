import { PAGE_TABS_MAP } from '@/config/navigation';
import { generateMetadata } from '@/lib/metadata';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.cards;
};

export function generateCardsMetadata(props: Props) {
  return generateMetadata({ page: 'cards', tab: props.tab });
}
