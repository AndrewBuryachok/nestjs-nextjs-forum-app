import { LuPlus } from 'react-icons/lu';
import { Plot } from '../types';
import ReservePlotForm from '../forms/reserve-plot-form';
import { Color } from '@/constants/colors';

export const reservePlotFactory = (plot: Plot, isAll: boolean) => ({
  action: 'reserve',
  dialog: 'plot',
  color: Color.GREEN,
  disabled: !!plot.rent,
  icon: <LuPlus />,
  body: <ReservePlotForm plot={plot} isAll={isAll} />,
});

export const reserveMyPlotAction = (plot: Plot) =>
  reservePlotFactory(plot, false);

export const reserveUserPlotAction = (plot: Plot) =>
  reservePlotFactory(plot, true);
