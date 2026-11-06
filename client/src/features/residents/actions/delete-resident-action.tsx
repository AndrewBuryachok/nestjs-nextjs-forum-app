import { LuUserX } from 'react-icons/lu';
import { User } from '../../users/types';
import DeleteResidentForm from '../forms/delete-resident-form';
import { Color } from '@/constants/colors';

export const deleteResidentAction = (user: User) => ({
  button: true,
  action: 'kick',
  dialog: 'resident',
  color: Color.RED,
  disabled: user.id === user.town!.user.id,
  userId: user.town!.user.id,
  icon: <LuUserX />,
  body: <DeleteResidentForm user={user} />,
});
