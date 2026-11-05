import { PAGE_TABS_MAP } from '@/config/navigation';
import { User } from '../../users/types';
import CustomGallery from '@/components/custom-gallery';
import ResidentsCard from './residents-card';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.residents;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function ResidentsGallery(props: Props) {
  return (
    <CustomGallery<User>
      page='residents'
      tab={props.tab}
      searchParams={props.searchParams}
      render={(user) => <ResidentsCard tab={props.tab} user={user} />}
    />
  );
}
