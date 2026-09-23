import { PAGE_TABS_MAP } from '@/config/navigation';
import CreatePlotForm from '../forms/create-plot-form';
import CustomAction from '@/components/custom-action';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.plots;
};

export default function PlotsAction(props: Props) {
  return (
    <CustomAction
      action='create'
      dialog='plot'
      body={<CreatePlotForm isAll={props.tab === 'all'} />}
    />
  );
}
