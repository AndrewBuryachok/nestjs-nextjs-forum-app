import { LuCheck } from 'react-icons/lu';
import { User } from '../../users/types';
import AcceptApplicationForm from '../forms/accept-application-form';
import { Color } from '@/constants/colors';

export const acceptApplicationAction = (user: User) => ({
  button: true,
  action: 'accept',
  dialog: 'application',
  color: Color.GREEN,
  icon: <LuCheck />,
  body: <AcceptApplicationForm user={user} />,
});
