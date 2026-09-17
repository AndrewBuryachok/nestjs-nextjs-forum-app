import { LuEye } from 'react-icons/lu';
import { Landmark } from '../types';
import ViewLandmarkForm from '../forms/view-landmark-form';

export const viewLandmarkAction = (landmark: Landmark) => ({
  action: 'view',
  dialog: 'landmark',
  icon: <LuEye />,
  body: <ViewLandmarkForm landmark={landmark} />,
});
