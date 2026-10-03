import CustomAction from '@/components/custom-action';
import CreateLicenseForm from '../forms/create-license-form';
import { Role } from '@/constants/roles';

export default function LicensesAction() {
  return (
    <CustomAction
      action='create'
      dialog='license'
      role={Role.ADMIN}
      body={<CreateLicenseForm />}
    />
  );
}
