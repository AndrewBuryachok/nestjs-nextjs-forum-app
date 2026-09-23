import { PAGE_TABS_MAP } from '@/config/navigation';
import { generateMetadata } from '@/lib/metadata';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.plots;
};

export function generatePlotsMetadata(props: Props) {
  return generateMetadata({ page: 'plots', tab: props.tab });
}
