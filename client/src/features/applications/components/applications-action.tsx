import { PAGE_TABS_MAP } from '@/config/navigation';
import CreateApplicationForm from '../forms/create-application-form';
import CustomAction from '@/components/custom-action';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.applications;
};

export default function ApplicationsAction(props: Props) {
  return props.tab === 'sent' ? (
    <CustomAction
      action='create'
      dialog='application'
      body={<CreateApplicationForm />}
    />
  ) : null;
}
