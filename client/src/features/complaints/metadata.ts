import { PAGE_TABS_MAP } from '@/config/navigation';
import { generateMetadata } from '@/lib/metadata';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.complaints;
};

export function generateComplaintsMetadata(props: Props) {
  return generateMetadata({ page: 'complaints', tab: props.tab });
}
