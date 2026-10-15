import { PAGE_TABS_MAP } from '@/config/navigation';
import { generateMetadata } from '@/lib/metadata';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.residents;
};

export async function generateResidentsMetadata(props: Props) {
  return generateMetadata({ page: 'residents', tab: props.tab });
}
