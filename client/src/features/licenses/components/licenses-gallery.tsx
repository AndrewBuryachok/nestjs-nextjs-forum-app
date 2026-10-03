import { PAGE_TABS_MAP } from '@/config/navigation';
import { User } from '@/features/users/types';
import CustomGallery from '@/components/custom-gallery';
import LicensesCard from './licenses-card';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.licenses;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function LicensesGallery(props: Props) {
  return (
    <CustomGallery<User>
      page='licenses'
      tab={props.tab}
      searchParams={props.searchParams}
      render={(user) => <LicensesCard user={user} />}
    />
  );
}
