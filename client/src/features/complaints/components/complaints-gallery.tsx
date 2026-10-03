import { PAGE_TABS_MAP } from '@/config/navigation';
import { Complaint } from '../types';
import CustomGallery from '@/components/custom-gallery';
import ComplaintsCard from './complaints-card';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.complaints;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function ComplaintsGallery(props: Props) {
  return (
    <CustomGallery<Complaint>
      page='complaints'
      tab={props.tab}
      searchParams={props.searchParams}
      render={(complaint) => <ComplaintsCard complaint={complaint} />}
    />
  );
}
