import { LuMinus } from 'react-icons/lu';
import { User } from '../../users/types';
import RejectApplicationForm from '../forms/reject-application-form';
import { Color } from '@/constants/colors';

export const rejectApplicationAction = (user: User) => ({
  action: 'reject',
  dialog: 'application',
  color: Color.RED,
  icon: <LuMinus />,
  body: <RejectApplicationForm user={user} />,
});
