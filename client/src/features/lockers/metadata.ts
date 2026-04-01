import { PAGE_TABS_MAP } from '@/config/navigation';
import { generateMetadata } from '@/lib/metadata';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.lockers;
};

export async function generateLockersMetadata(props: Props) {
  return generateMetadata({ page: 'lockers', tab: props.tab });
}
