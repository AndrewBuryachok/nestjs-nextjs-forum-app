import { PAGE_TABS_MAP } from '@/config/navigation';
import { Shop } from '../types';
import CustomGallery from '@/components/custom-gallery';
import ShopsCard from './shops-card';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.shops;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function ShopsGallery(props: Props) {
  return (
    <CustomGallery<Shop>
      page='shops'
      tab={props.tab}
      searchParams={props.searchParams}
      render={(shop) => <ShopsCard tab={props.tab} shop={shop} />}
    />
  );
}
