import { LuTrash2 } from 'react-icons/lu';
import { Plot } from '../types';
import DeletePlotForm from '../forms/delete-plot-form';
import { Color } from '@/constants/colors';

export const deletePlotFactory = (plot: Plot, isAll: boolean) => ({
  action: 'delete',
  dialog: 'plot',
  color: Color.RED,
  disabled: !!plot.rent,
  icon: <LuTrash2 />,
  body: <DeletePlotForm plot={plot} isAll={isAll} />,
});

export const deleteMyPlotAction = (plot: Plot) =>
  deletePlotFactory(plot, false);

export const deleteUserPlotAction = (plot: Plot) =>
  deletePlotFactory(plot, true);
