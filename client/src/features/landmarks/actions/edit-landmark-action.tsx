import { LuPencil } from 'react-icons/lu';
import { Landmark } from '../types';
import EditLandmarkForm from '../forms/edit-landmark-form';
import { Color } from '@/constants/colors';

export const editLandmarkFactory = (landmark: Landmark, isAll: boolean) => ({
  action: 'edit',
  dialog: 'landmark',
  color: Color.YELLOW,
  icon: <LuPencil />,
  body: <EditLandmarkForm landmark={landmark} isAll={isAll} />,
});

export const editMyLandmarkAction = (landmark: Landmark) =>
  editLandmarkFactory(landmark, false);

export const editUserLandmarkAction = (landmark: Landmark) =>
  editLandmarkFactory(landmark, true);
