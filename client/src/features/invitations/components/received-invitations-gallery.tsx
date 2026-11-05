import { PAGE_TABS_MAP } from '@/config/navigation';
import { Town } from '../../towns/types';
import CustomGallery from '@/components/custom-gallery';
import ReceivedInvitationsCard from './received-invitations-card';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.invitations;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function ReceivedInvitationsGallery(props: Props) {
  return (
    <CustomGallery<Town>
      page='invitations'
      tab={props.tab}
      searchParams={props.searchParams}
      render={(town) => <ReceivedInvitationsCard town={town} />}
    />
  );
}
