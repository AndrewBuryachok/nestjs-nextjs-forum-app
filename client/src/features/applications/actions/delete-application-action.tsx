import { LuTrash2 } from 'react-icons/lu';
import { Town } from '../../towns/types';
import DeleteApplicationForm from '../forms/delete-application-form';
import { Color } from '@/constants/colors';

export const deleteApplicationAction = (town: Town) => ({
  action: 'delete',
  dialog: 'application',
  color: Color.RED,
  icon: <LuTrash2 />,
  body: <DeleteApplicationForm town={town} />,
});
