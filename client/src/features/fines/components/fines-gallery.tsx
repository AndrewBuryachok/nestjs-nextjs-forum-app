import { PAGE_TABS_MAP } from '@/config/navigation';
import { Fine } from '../types';
import CustomGallery from '@/components/custom-gallery';
import FinesCard from './fines-card';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.fines;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function FinesGallery(props: Props) {
  return (
    <CustomGallery<Fine>
      page='fines'
      tab={props.tab}
      searchParams={props.searchParams}
      render={(fine) => <FinesCard tab={props.tab} fine={fine} />}
    />
  );
}
