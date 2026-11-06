import { LuCheck } from 'react-icons/lu';
import { Town } from '../../towns/types';
import AcceptInvitationForm from '../forms/accept-invitation-form';
import { Color } from '@/constants/colors';

export const acceptInvitationAction = (town: Town) => ({
  button: true,
  action: 'accept',
  dialog: 'invitation',
  color: Color.GREEN,
  icon: <LuCheck />,
  body: <AcceptInvitationForm town={town} />,
});
