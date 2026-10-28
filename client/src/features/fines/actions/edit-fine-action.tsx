import { LuPencil } from 'react-icons/lu';
import { Fine } from '../types';
import EditFineForm from '../forms/edit-fine-form';
import { Color } from '@/constants/colors';

export const editFineAction = (fine: Fine) => ({
  action: 'edit',
  dialog: 'fine',
  color: Color.YELLOW,
  disabled: !!fine.paidAt,
  icon: <LuPencil />,
  body: <EditFineForm fine={fine} />,
});
