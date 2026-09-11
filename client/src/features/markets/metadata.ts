import { PAGE_TABS_MAP } from '@/config/navigation';
import { generateMetadata } from '@/lib/metadata';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.markets;
};

export function generateMarketsMetadata(props: Props) {
  return generateMetadata({ page: 'markets', tab: props.tab });
}
