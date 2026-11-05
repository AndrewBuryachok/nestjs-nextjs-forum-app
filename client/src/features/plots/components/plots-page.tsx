import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import PlotsAction from './plots-action';
import PlotsGallery from './plots-gallery';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.plots;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function PlotsPage(props: Props) {
  return (
    <CustomPage
      page='plots'
      tab={props.tab}
      action={<PlotsAction tab={props.tab} />}
      gallery={
        <PlotsGallery tab={props.tab} searchParams={props.searchParams} />
      }
    />
  );
}
