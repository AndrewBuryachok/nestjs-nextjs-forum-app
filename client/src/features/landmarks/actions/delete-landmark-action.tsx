import { LuTrash2 } from 'react-icons/lu';
import { Landmark } from '../types';
import DeleteLandmarkForm from '../forms/delete-landmark-form';
import { Color } from '@/constants/colors';

export const deleteLandmarkFactory = (landmark: Landmark, isAll: boolean) => ({
  action: 'delete',
  dialog: 'landmark',
  color: Color.RED,
  icon: <LuTrash2 />,
  body: <DeleteLandmarkForm landmark={landmark} isAll={isAll} />,
});

export const deleteMyLandmarkAction = (landmark: Landmark) =>
  deleteLandmarkFactory(landmark, false);

export const deleteUserLandmarkAction = (landmark: Landmark) =>
  deleteLandmarkFactory(landmark, true);
