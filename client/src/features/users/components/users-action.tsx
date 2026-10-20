import CreateUserForm from '../forms/create-user-form';
import CustomAction from '@/components/custom-action';

export default function UsersAction() {
  return <CustomAction action='add' dialog='user' body={<CreateUserForm />} />;
}
