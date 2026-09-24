import { LuPencil } from 'react-icons/lu';
import { Plot } from '../types';
import EditPlotForm from '../forms/edit-plot-form';
import { Color } from '@/constants/colors';

export const editPlotFactory = (plot: Plot, isAll: boolean) => ({
  action: 'edit',
  dialog: 'plot',
  color: Color.YELLOW,
  icon: <LuPencil />,
  body: <EditPlotForm plot={plot} isAll={isAll} />,
});

export const editMyPlotAction = (plot: Plot) => editPlotFactory(plot, false);

export const editUserPlotAction = (plot: Plot) => editPlotFactory(plot, true);
