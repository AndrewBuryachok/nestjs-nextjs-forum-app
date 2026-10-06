import { PAGE_TABS_MAP } from '@/config/navigation';
import CreateComplaintForm from '../forms/create-complaint-form';
import CustomAction from '@/components/custom-action';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.complaints;
};

export default function ComplaintsAction(props: Props) {
  return (
    <CustomAction
      action='create'
      dialog='complaint'
      body={<CreateComplaintForm isAll={props.tab === 'all'} />}
    />
  );
}
