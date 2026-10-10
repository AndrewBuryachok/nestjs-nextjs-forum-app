import { LuArchive } from 'react-icons/lu';
import { Complaint } from '../types';
import CustomAction from '@/components/custom-action';
import CloseComplaintForm from '../forms/close-complaint-form';
import { Role } from '@/constants/roles';

type Props = {
  complaint: Complaint;
};

export default function CloseComplaintAction(props: Props) {
  return (
    <CustomAction
      action='close'
      dialog='complaint'
      disabled={!!props.complaint.closedAt}
      role={Role.ADMIN}
      icon={<LuArchive />}
      body={<CloseComplaintForm complaint={props.complaint} />}
    />
  );
}
