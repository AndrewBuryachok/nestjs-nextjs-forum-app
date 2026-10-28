import { LuTrash2 } from 'react-icons/lu';
import { Fine } from '../types';
import DeleteFineForm from '../forms/delete-fine-form';
import { Color } from '@/constants/colors';

export const deleteFineAction = (fine: Fine) => ({
  action: 'delete',
  dialog: 'fine',
  color: Color.RED,
  disabled: !!fine.paidAt,
  icon: <LuTrash2 />,
  body: <DeleteFineForm fine={fine} />,
});
