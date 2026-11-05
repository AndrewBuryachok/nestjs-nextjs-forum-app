import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import InvitationsAction from './invitations-action';
import SentInvitationsGallery from './sent-invitations-gallery';
import ReceivedInvitationsGallery from './received-invitations-gallery';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.invitations;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function InvitationsPage(props: Props) {
  return (
    <CustomPage
      page='invitations'
      tab={props.tab}
      action={<InvitationsAction tab={props.tab} />}
      gallery={
        props.tab === 'sent' ? (
          <SentInvitationsGallery
            tab={props.tab}
            searchParams={props.searchParams}
          />
        ) : (
          <ReceivedInvitationsGallery
            tab={props.tab}
            searchParams={props.searchParams}
          />
        )
      }
    />
  );
}
