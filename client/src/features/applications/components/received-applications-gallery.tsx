import { PAGE_TABS_MAP } from '@/config/navigation';
import { User } from '../../users/types';
import CustomGallery from '@/components/custom-gallery';
import ReceivedApplicationsCard from './received-applications-card';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.applications;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function ReceivedApplicationsGallery(props: Props) {
  return (
    <CustomGallery<User>
      page='applications'
      tab={props.tab}
      searchParams={props.searchParams}
      render={(user) => <ReceivedApplicationsCard user={user} />}
    />
  );
}
