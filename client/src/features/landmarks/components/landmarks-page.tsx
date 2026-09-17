import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import LandmarksGallery from './landmarks-gallery';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.landmarks;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function LandmarksPage(props: Props) {
  return (
    <CustomPage
      page='landmarks'
      tab={props.tab}
      gallery={
        <LandmarksGallery tab={props.tab} searchParams={props.searchParams} />
      }
    />
  );
}
