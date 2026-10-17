import { LuPlus } from 'react-icons/lu';
import { User } from '../../users/types';
import AcceptApplicationForm from '../forms/accept-application-form';
import { Color } from '@/constants/colors';

export const acceptApplicationAction = (user: User) => ({
  action: 'accept',
  dialog: 'application',
  color: Color.GREEN,
  icon: <LuPlus />,
  body: <AcceptApplicationForm user={user} />,
});
