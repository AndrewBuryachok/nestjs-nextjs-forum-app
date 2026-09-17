import { PAGE_TABS_MAP } from '@/config/navigation';
import CreateLandmarkForm from '../forms/create-landmark-form';
import CustomAction from '@/components/custom-action';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.landmarks;
};

export default function LandmarksAction(props: Props) {
  return (
    <CustomAction
      action='create'
      dialog='landmark'
      body={<CreateLandmarkForm isAll={props.tab === 'all'} />}
    />
  );
}
