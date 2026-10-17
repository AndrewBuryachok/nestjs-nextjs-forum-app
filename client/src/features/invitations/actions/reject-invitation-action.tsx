import { LuMinus } from 'react-icons/lu';
import { Town } from '../../towns/types';
import RejectInvitationForm from '../forms/reject-invitation-form';
import { Color } from '@/constants/colors';

export const rejectInvitationAction = (town: Town) => ({
  action: 'reject',
  dialog: 'invitation',
  color: Color.RED,
  icon: <LuMinus />,
  body: <RejectInvitationForm town={town} />,
});
