import { LuPencil } from 'react-icons/lu';
import { Fine } from '../types';
import EditFineForm from '../forms/edit-fine-form';
import { Color } from '@/constants/colors';

export const editFineFactory = (fine: Fine, isAll: boolean) => ({
  action: 'edit',
  dialog: 'fine',
  color: Color.YELLOW,
  disabled: !!fine.paidAt,
  userId: isAll ? 0 : fine.senderUser.id,
  icon: <LuPencil />,
  body: <EditFineForm fine={fine} isAll={isAll} />,
});

export const editMyFineAction = (fine: Fine) => editFineFactory(fine, false);

export const editUserFineAction = (fine: Fine) => editFineFactory(fine, true);
