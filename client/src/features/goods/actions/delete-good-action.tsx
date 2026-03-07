import { LuTrash2 } from 'react-icons/lu';
import { Good } from '../types';
import DeleteGoodForm from '../forms/delete-good-form';
import { Color } from '@/constants/colors';

export const deleteGoodFactory = (good: Good, isAll: boolean) => ({
  action: 'delete',
  dialog: 'good',
  color: Color.RED,
  icon: <LuTrash2 />,
  body: <DeleteGoodForm good={good} isAll={isAll} />,
});

export const deleteMyGoodAction = (good: Good) =>
  deleteGoodFactory(good, false);

export const deleteUserGoodAction = (good: Good) =>
  deleteGoodFactory(good, true);
