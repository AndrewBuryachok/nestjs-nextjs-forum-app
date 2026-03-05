import { LuEye } from 'react-icons/lu';
import { Good } from '../types';
import ViewGoodForm from '../forms/view-good-form';
import { Color } from '@/constants/colors';

export const viewGoodAction = (good: Good) => ({
  action: 'view',
  dialog: 'good',
  color: Color.BLUE,
  icon: <LuEye />,
  body: <ViewGoodForm good={good} />,
});
