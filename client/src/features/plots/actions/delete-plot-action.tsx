import { LuTrash2 } from 'react-icons/lu';
import { Plot } from '../types';
import DeletePlotForm from '../forms/delete-plot-form';

export const deletePlotFactory = (plot: Plot, isAll: boolean) => ({
  danger: true,
  action: 'delete',
  dialog: 'plot',
  disabled: !!plot.rent,
  icon: <LuTrash2 />,
  body: <DeletePlotForm plot={plot} isAll={isAll} />,
});

export const deleteMyPlotAction = (plot: Plot) =>
  deletePlotFactory(plot, false);

export const deleteUserPlotAction = (plot: Plot) =>
  deletePlotFactory(plot, true);
