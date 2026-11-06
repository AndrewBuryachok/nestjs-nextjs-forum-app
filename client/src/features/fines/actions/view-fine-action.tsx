import { LuEye } from 'react-icons/lu';
import { Fine } from '../types';
import ViewFineForm from '../forms/view-fine-form';

export const viewFineAction = (fine: Fine) => ({
  action: 'view',
  dialog: 'fine',
  icon: <LuEye />,
  body: <ViewFineForm fine={fine} />,
});
