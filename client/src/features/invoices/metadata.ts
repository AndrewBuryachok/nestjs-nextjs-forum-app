import { PAGE_TABS_MAP } from '@/config/navigation';
import { generateMetadata } from '@/lib/metadata';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.invoices;
};

export function generateInvoicesMetadata(props: Props) {
  return generateMetadata({ page: 'invoices', tab: props.tab });
}
