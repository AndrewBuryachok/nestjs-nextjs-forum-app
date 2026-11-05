import { PAGE_TABS_MAP } from '@/config/navigation';
import { Plot } from '../types';
import CustomGallery from '@/components/custom-gallery';
import PlotsCard from './plots-card';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.plots;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function PlotsGallery(props: Props) {
  return (
    <CustomGallery<Plot>
      page='plots'
      tab={props.tab}
      searchParams={props.searchParams}
      render={(plot) => <PlotsCard tab={props.tab} plot={plot} />}
    />
  );
}
