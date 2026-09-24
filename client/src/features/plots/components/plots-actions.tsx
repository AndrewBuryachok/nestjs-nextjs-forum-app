import { PAGE_TABS_MAP } from '@/config/navigation';
import { Plot } from '../types';
import { viewPlotAction } from '../actions/view-plot-action';
import {
  reserveMyPlotAction,
  reserveUserPlotAction,
} from '../actions/reserve-plot-action';
import {
  editMyPlotAction,
  editUserPlotAction,
} from '../actions/edit-plot-action';
import {
  deleteMyPlotAction,
  deleteUserPlotAction,
} from '../actions/delete-plot-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.plots;
  plot: Plot;
};

export default function PlotsActions(props: Props) {
  const actions = {
    main: [reserveMyPlotAction],
    my: [editMyPlotAction, deleteMyPlotAction],
    all: [reserveUserPlotAction, editUserPlotAction, deleteUserPlotAction],
  }[props.tab];

  return (
    <CustomActions
      actions={[viewPlotAction, ...actions].map((action) => action(props.plot))}
    />
  );
}
