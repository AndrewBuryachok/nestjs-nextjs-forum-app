import { PAGE_TABS_MAP } from '@/config/navigation';
import { generateMetadata } from '@/lib/metadata';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.applications;
};

export async function generateApplicationsMetadata(props: Props) {
  return generateMetadata({ page: 'applications', tab: props.tab });
}
