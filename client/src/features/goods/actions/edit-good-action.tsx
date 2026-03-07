import { LuPencil } from 'react-icons/lu';
import { Good } from '../types';
import EditGoodForm from '../forms/edit-good-form';
import { Color } from '@/constants/colors';

export const editGoodFactory = (good: Good, isAll: boolean) => ({
  action: 'edit',
  dialog: 'good',
  color: Color.YELLOW,
  icon: <LuPencil />,
  body: <EditGoodForm good={good} isAll={isAll} />,
});

export const editMyGoodAction = (good: Good) => editGoodFactory(good, false);

export const editUserGoodAction = (good: Good) => editGoodFactory(good, true);
