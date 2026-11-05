import { PAGE_TABS_MAP } from '@/config/navigation';
import { User } from '../../users/types';
import CustomGallery from '@/components/custom-gallery';
import SentInvitationsCard from './sent-invitations-card';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.invitations;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function SentInvitationsGallery(props: Props) {
  return (
    <CustomGallery<User>
      page='invitations'
      tab={props.tab}
      searchParams={props.searchParams}
      render={(user) => <SentInvitationsCard user={user} />}
    />
  );
}
