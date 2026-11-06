import { LuEye } from 'react-icons/lu';
import { Plot } from '../types';
import ViewPlotForm from '../forms/view-plot-form';

export const viewPlotAction = (plot: Plot) => ({
  action: 'view',
  dialog: 'plot',
  icon: <LuEye />,
  body: <ViewPlotForm plot={plot} />,
});
