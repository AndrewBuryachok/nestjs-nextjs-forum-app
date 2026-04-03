import { PAGE_TABS_MAP } from '@/config/navigation';
import { generateMetadata } from '@/lib/metadata';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.orders;
};

export function generateOrdersMetadata(props: Props) {
  return generateMetadata({ page: 'orders', tab: props.tab });
}
