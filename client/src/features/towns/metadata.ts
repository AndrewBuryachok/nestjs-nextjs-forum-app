import { PAGE_TABS_MAP } from '@/config/navigation';
import { generateMetadata } from '@/lib/metadata';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.towns;
};

export async function generateTownsMetadata(props: Props) {
  return generateMetadata({ page: 'towns', tab: props.tab });
}
