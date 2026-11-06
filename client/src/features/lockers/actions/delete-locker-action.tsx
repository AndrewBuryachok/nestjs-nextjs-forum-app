import { LuTrash2 } from 'react-icons/lu';
import { Locker } from '../types';
import DeleteLockerForm from '../forms/delete-locker-form';

export const deleteLockerFactory = (locker: Locker, isAll: boolean) => ({
  danger: true,
  action: 'delete',
  dialog: 'locker',
  icon: <LuTrash2 />,
  body: <DeleteLockerForm locker={locker} isAll={isAll} />,
});

export const deleteMyLockerAction = (locker: Locker) =>
  deleteLockerFactory(locker, false);

export const deleteUserLockerAction = (locker: Locker) =>
  deleteLockerFactory(locker, true);
