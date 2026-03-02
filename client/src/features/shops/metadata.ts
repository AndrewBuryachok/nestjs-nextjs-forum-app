import { PAGE_TABS_MAP } from '@/config/navigation';
import { generateMetadata } from '@/lib/metadata';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.shops;
};

export function generateShopsMetadata(props: Props) {
  return generateMetadata({ page: 'shops', tab: props.tab });
}
