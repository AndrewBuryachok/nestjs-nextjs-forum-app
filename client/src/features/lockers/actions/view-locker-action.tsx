import { LuEye } from 'react-icons/lu';
import { Locker } from '../types';
import ViewLockerForm from '../forms/view-locker-form';
import { Color } from '@/constants/colors';

export const viewLockerAction = (locker: Locker) => ({
  action: 'view',
  dialog: 'locker',
  color: Color.BLUE,
  icon: <LuEye />,
  body: <ViewLockerForm locker={locker} />,
});
