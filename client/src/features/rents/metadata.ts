import { PAGE_TABS_MAP } from '@/config/navigation';
import { generateMetadata } from '@/lib/metadata';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.rents;
};

export function generateRentsMetadata(props: Props) {
  return generateMetadata({ page: 'rents', tab: props.tab });
}
