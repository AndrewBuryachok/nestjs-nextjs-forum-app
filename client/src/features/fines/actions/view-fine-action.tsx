import { LuEye } from 'react-icons/lu';
import { Fine } from '../types';
import ViewFineForm from '../forms/view-fine-form';
import { Color } from '@/constants/colors';

export const viewFineAction = (fine: Fine) => ({
  action: 'view',
  dialog: 'fine',
  color: Color.BLUE,
  icon: <LuEye />,
  body: <ViewFineForm fine={fine} />,
});
