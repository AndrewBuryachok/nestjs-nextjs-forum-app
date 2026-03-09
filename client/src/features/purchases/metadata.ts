import { PAGE_TABS_MAP } from '@/config/navigation';
import { generateMetadata } from '@/lib/metadata';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.purchases;
};

export function generatePurchasesMetadata(props: Props) {
  return generateMetadata({ page: 'purchases', tab: props.tab });
}
