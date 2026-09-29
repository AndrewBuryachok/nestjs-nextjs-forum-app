import { PAGE_TABS_MAP } from '@/config/navigation';
import CreateTownForm from '../forms/create-town-form';
import CustomAction from '@/components/custom-action';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.towns;
};

export default function TownsAction(props: Props) {
  return (
    <CustomAction
      action='create'
      dialog='town'
      body={<CreateTownForm isAll={props.tab === 'all'} />}
    />
  );
}
