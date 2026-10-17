import { LuPlus } from 'react-icons/lu';
import { Town } from '../../towns/types';
import AcceptInvitationForm from '../forms/accept-invitation-form';
import { Color } from '@/constants/colors';

export const acceptInvitationAction = (town: Town) => ({
  action: 'accept',
  dialog: 'invitation',
  color: Color.GREEN,
  icon: <LuPlus />,
  body: <AcceptInvitationForm town={town} />,
});
