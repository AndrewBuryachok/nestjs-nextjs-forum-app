import { PAGE_TABS_MAP } from '@/config/navigation';
import { Locker } from '../types';
import CustomGallery from '@/components/custom-gallery';
import LockersCard from './lockers-card';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.lockers;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function LockersGallery(props: Props) {
  return (
    <CustomGallery<Locker>
      page='lockers'
      tab={props.tab}
      searchParams={props.searchParams}
      render={(locker) => <LockersCard tab={props.tab} locker={locker} />}
    />
  );
}
