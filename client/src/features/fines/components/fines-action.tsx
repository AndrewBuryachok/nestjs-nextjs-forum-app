import { PAGE_TABS_MAP } from '@/config/navigation';
import CreateFineForm from '../forms/create-fine-form';
import CustomAction from '@/components/custom-action';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.fines;
};

export default function FinesAction(props: Props) {
  return props.tab === 'all' ? (
    <CustomAction action='create' dialog='fine' body={<CreateFineForm />} />
  ) : null;
}
