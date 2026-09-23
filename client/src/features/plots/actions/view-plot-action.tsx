import { LuEye } from 'react-icons/lu';
import { Plot } from '../types';
import ViewPlotForm from '../forms/view-plot-form';
import { Color } from '@/constants/colors';

export const viewPlotAction = (plot: Plot) => ({
  action: 'view',
  dialog: 'plot',
  color: Color.BLUE,
  icon: <LuEye />,
  body: <ViewPlotForm plot={plot} />,
});
