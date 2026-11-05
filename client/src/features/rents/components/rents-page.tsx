import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import RentsGallery from './rents-gallery';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.rents;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function RentsPage(props: Props) {
  return (
    <CustomPage
      page='rents'
      tab={props.tab}
      gallery={
        <RentsGallery tab={props.tab} searchParams={props.searchParams} />
      }
    />
  );
}
