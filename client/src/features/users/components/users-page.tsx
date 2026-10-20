import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import UsersAction from './users-action';
import UsersGallery from './users-gallery';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.users;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function UsersPage(props: Props) {
  return (
    <CustomPage
      page='users'
      tab={props.tab}
      action={<UsersAction />}
      gallery={
        <UsersGallery tab={props.tab} searchParams={props.searchParams} />
      }
    />
  );
}
