import { PAGE_TABS_MAP } from '@/config/navigation';
import { Rent } from '../types';
import CustomGallery from '@/components/custom-gallery';
import RentsCard from './rents-card';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.rents;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function RentsGallery(props: Props) {
  return (
    <CustomGallery<Rent>
      page='rents'
      tab={props.tab}
      searchParams={props.searchParams}
      render={(rent) => <RentsCard tab={props.tab} rent={rent} />}
    />
  );
}
