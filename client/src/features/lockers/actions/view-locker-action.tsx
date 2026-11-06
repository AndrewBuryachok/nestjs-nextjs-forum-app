import { LuEye } from 'react-icons/lu';
import { Locker } from '../types';
import ViewLockerForm from '../forms/view-locker-form';

export const viewLockerAction = (locker: Locker) => ({
  action: 'view',
  dialog: 'locker',
  icon: <LuEye />,
  body: <ViewLockerForm locker={locker} />,
});
