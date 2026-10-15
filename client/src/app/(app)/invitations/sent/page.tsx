import { generateInvitationsMetadata } from '@/features/invitations/metadata';
import InvitationsPage from '@/features/invitations/components/invitations-page';

export function generateMetadata() {
  return generateInvitationsMetadata({ tab: 'sent' });
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Page(props: Props) {
  return <InvitationsPage tab='sent' searchParams={props.searchParams} />;
}
