import { PAGE_TABS_MAP } from '@/config/navigation';
import { generateMetadata } from '@/lib/metadata';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.products;
};

export function generateProductsMetadata(props: Props) {
  return generateMetadata({ page: 'products', tab: props.tab });
}
