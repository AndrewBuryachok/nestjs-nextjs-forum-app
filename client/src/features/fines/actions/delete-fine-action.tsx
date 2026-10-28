import { LuTrash2 } from 'react-icons/lu';
import { Fine } from '../types';
import DeleteFineForm from '../forms/delete-fine-form';

export const deleteFineAction = (fine: Fine) => ({
  danger: true,
  action: 'delete',
  dialog: 'fine',
  disabled: !!fine.paidAt,
  icon: <LuTrash2 />,
  body: <DeleteFineForm fine={fine} />,
});
