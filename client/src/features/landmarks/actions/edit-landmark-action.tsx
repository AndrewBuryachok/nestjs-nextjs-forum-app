import { LuPencil } from 'react-icons/lu';
import { Landmark } from '../types';
import EditLandmarkForm from '../forms/edit-landmark-form';

export const editLandmarkFactory = (landmark: Landmark, isAll: boolean) => ({
  action: 'edit',
  dialog: 'landmark',
  icon: <LuPencil />,
  body: <EditLandmarkForm landmark={landmark} isAll={isAll} />,
});

export const editMyLandmarkAction = (landmark: Landmark) =>
  editLandmarkFactory(landmark, false);

export const editUserLandmarkAction = (landmark: Landmark) =>
  editLandmarkFactory(landmark, true);
