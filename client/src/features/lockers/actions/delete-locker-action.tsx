import { LuTrash2 } from 'react-icons/lu';
import { Locker } from '../types';
import DeleteLockerForm from '../forms/delete-locker-form';
import { Color } from '@/constants/colors';

export const deleteLockerFactory = (locker: Locker, isAll: boolean) => ({
  action: 'delete',
  dialog: 'locker',
  color: Color.RED,
  icon: <LuTrash2 />,
  body: <DeleteLockerForm locker={locker} isAll={isAll} />,
});

export const deleteMyLockerAction = (locker: Locker) =>
  deleteLockerFactory(locker, false);

export const deleteUserLockerAction = (locker: Locker) =>
  deleteLockerFactory(locker, true);
