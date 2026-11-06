import { LuPencil } from 'react-icons/lu';
import { Locker } from '../types';
import EditLockerForm from '../forms/edit-locker-form';

export const editLockerFactory = (locker: Locker, isAll: boolean) => ({
  action: 'edit',
  dialog: 'locker',
  icon: <LuPencil />,
  body: <EditLockerForm locker={locker} isAll={isAll} />,
});

export const editMyLockerAction = (locker: Locker) =>
  editLockerFactory(locker, false);

export const editUserLockerAction = (locker: Locker) =>
  editLockerFactory(locker, true);
