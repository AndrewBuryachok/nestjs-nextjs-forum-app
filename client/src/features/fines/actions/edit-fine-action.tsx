import { LuPencil } from 'react-icons/lu';
import { Fine } from '../types';
import EditFineForm from '../forms/edit-fine-form';

export const editFineAction = (fine: Fine) => ({
  action: 'edit',
  dialog: 'fine',
  disabled: !!fine.paidAt,
  icon: <LuPencil />,
  body: <EditFineForm fine={fine} />,
});
