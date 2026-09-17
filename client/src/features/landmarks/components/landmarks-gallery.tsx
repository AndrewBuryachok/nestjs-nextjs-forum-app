import { PAGE_TABS_MAP } from '@/config/navigation';
import { Landmark } from '../types';
import CustomGallery from '@/components/custom-gallery';
import LandmarksCard from './landmarks-card';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.landmarks;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function LandmarksGallery(props: Props) {
  return (
    <CustomGallery<Landmark>
      page='landmarks'
      tab={props.tab}
      searchParams={props.searchParams}
      render={(landmark) => (
        <LandmarksCard tab={props.tab} landmark={landmark} />
      )}
    />
  );
}
