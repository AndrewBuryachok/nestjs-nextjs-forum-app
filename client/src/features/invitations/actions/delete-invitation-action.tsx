import { LuTrash2 } from 'react-icons/lu';
import { User } from '../../users/types';
import DeleteInvitationForm from '../forms/delete-invitation-form';
import { Color } from '@/constants/colors';

export const deleteInvitationAction = (user: User) => ({
  button: true,
  action: 'delete',
  dialog: 'invitation',
  color: Color.RED,
  icon: <LuTrash2 />,
  body: <DeleteInvitationForm user={user} />,
});
