import { LuEye } from 'react-icons/lu';
import { Landmark } from '../types';
import ViewLandmarkForm from '../forms/view-landmark-form';
import { Color } from '@/constants/colors';

export const viewLandmarkAction = (landmark: Landmark) => ({
  action: 'view',
  dialog: 'landmark',
  color: Color.BLUE,
  icon: <LuEye />,
  body: <ViewLandmarkForm landmark={landmark} />,
});
