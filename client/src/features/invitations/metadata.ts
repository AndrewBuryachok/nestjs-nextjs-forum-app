import { PAGE_TABS_MAP } from '@/config/navigation';
import { generateMetadata } from '@/lib/metadata';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.invitations;
};

export async function generateInvitationsMetadata(props: Props) {
  return generateMetadata({ page: 'invitations', tab: props.tab });
}
