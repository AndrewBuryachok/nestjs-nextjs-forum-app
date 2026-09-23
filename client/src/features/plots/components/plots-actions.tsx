import { PAGE_TABS_MAP } from '@/config/navigation';
import { Plot } from '../types';
import { viewPlotAction } from '../actions/view-plot-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.plots;
  plot: Plot;
};

export default function PlotsActions(props: Props) {
  return (
    <CustomActions
      actions={[viewPlotAction].map((action) => action(props.plot))}
    />
  );
}
