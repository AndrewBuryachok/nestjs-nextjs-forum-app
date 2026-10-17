import { PAGE_TABS_MAP } from '@/config/navigation';
import CreateInvitationForm from '../forms/create-invitation-form';
import CustomAction from '@/components/custom-action';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.invitations;
};

export default function InvitationsAction(props: Props) {
  return props.tab === 'sent' ? (
    <CustomAction
      action='create'
      dialog='invitation'
      body={<CreateInvitationForm />}
    />
  ) : null;
}
