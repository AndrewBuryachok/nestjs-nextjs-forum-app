import { PAGE_TABS_MAP } from '@/config/navigation';
import { User } from '../types';
import CustomGallery from '@/components/custom-gallery';
import UsersCard from './users-card';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.users;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function UsersGallery(props: Props) {
  return (
    <CustomGallery<User>
      page='users'
      tab={props.tab}
      searchParams={props.searchParams}
      render={(user) => <UsersCard tab={props.tab} user={user} />}
    />
  );
}
