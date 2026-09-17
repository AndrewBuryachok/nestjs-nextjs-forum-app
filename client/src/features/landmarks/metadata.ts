import { PAGE_TABS_MAP } from '@/config/navigation';
import { generateMetadata } from '@/lib/metadata';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.landmarks;
};

export async function generateLandmarksMetadata(props: Props) {
  return generateMetadata({ page: 'landmarks', tab: props.tab });
}
