import { LuLogOut } from 'react-icons/lu';
import LeaveTownForm from '../forms/leave-town-form';
import CustomAction from '@/components/custom-action';

export default function ResidentsAction() {
  return (
    <CustomAction
      action='leave'
      dialog='town'
      icon={<LuLogOut />}
      body={<LeaveTownForm />}
    />
  );
}
