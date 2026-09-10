import { PAGE_TABS_MAP } from '@/config/navigation';
import { generateMetadata } from '@/lib/metadata';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.fines;
};

export function generateFinesMetadata(props: Props) {
  return generateMetadata({ page: 'fines', tab: props.tab });
}
