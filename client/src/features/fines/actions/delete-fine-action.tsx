import { LuTrash2 } from 'react-icons/lu';
import { Fine } from '../types';
import DeleteFineForm from '../forms/delete-fine-form';

export const deleteFineFactory = (fine: Fine, isAll: boolean) => ({
  danger: true,
  action: 'delete',
  dialog: 'fine',
  disabled: !!fine.paidAt,
  userId: isAll ? 0 : fine.senderUser.id,
  icon: <LuTrash2 />,
  body: <DeleteFineForm fine={fine} isAll={isAll} />,
});

export const deleteMyFineAction = (fine: Fine) =>
  deleteFineFactory(fine, false);

export const deleteUserFineAction = (fine: Fine) =>
  deleteFineFactory(fine, true);
