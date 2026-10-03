import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import ComplaintsGallery from './complaints-gallery';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.complaints;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function ComplaintsPage(props: Props) {
  return (
    <CustomPage page='complaints' tab={props.tab}>
      <ComplaintsGallery tab={props.tab} searchParams={props.searchParams} />
    </CustomPage>
  );
}
