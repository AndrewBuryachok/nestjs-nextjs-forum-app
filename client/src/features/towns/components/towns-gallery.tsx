import { PAGE_TABS_MAP } from '@/config/navigation';
import { Town } from '../types';
import CustomGallery from '@/components/custom-gallery';
import TownsCard from './towns-card';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.towns;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function TownsGallery(props: Props) {
  return (
    <CustomGallery<Town>
      page='towns'
      tab={props.tab}
      searchParams={props.searchParams}
      render={(town) => <TownsCard tab={props.tab} town={town} />}
    />
  );
}
