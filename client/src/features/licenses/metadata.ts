import { PAGE_TABS_MAP } from '@/config/navigation';
import { generateMetadata } from '@/lib/metadata';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.licenses;
};

export async function generateLicensesMetadata(props: Props) {
  return generateMetadata({ page: 'licenses', tab: props.tab });
}
