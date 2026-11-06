import { LuX } from 'react-icons/lu';
import { User } from '../../users/types';
import RejectApplicationForm from '../forms/reject-application-form';
import { Color } from '@/constants/colors';

export const rejectApplicationAction = (user: User) => ({
  button: true,
  action: 'reject',
  dialog: 'application',
  color: Color.RED,
  icon: <LuX />,
  body: <RejectApplicationForm user={user} />,
});
