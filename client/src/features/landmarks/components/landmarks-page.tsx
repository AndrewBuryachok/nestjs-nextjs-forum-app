import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import LandmarksAction from './landmarks-action';
import LandmarksTable from './landmarks-table';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.landmarks;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function LandmarksPage(props: Props) {
  return (
    <CustomPage
      page='landmarks'
      tab={props.tab}
      action={<LandmarksAction tab={props.tab} />}
      table={
        <LandmarksTable tab={props.tab} searchParams={props.searchParams} />
      }
    />
  );
}
