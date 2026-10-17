import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import InvitationsAction from './invitations-action';
import SentInvitationsTable from './sent-invitations-table';
import ReceivedInvitationsTable from './received-invitations-table';

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
      table={
        props.tab === 'sent' ? (
          <SentInvitationsTable
            tab={props.tab}
            searchParams={props.searchParams}
          />
        ) : (
          <ReceivedInvitationsTable
            tab={props.tab}
            searchParams={props.searchParams}
          />
        )
      }
    />
  );
}
