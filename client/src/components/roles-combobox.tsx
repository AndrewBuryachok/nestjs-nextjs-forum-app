import { useTranslations } from 'next-intl';
import CustomCombobox from './custom-combobox';
import { Role } from '@/constants/roles';

type Props = {
  data: Role[];
  value: Role;
  setValue: (role: Role) => void;
};

export default function RolesCombobox(props: Props) {
  const t = useTranslations();

  return (
    <CustomCombobox
      data={props.data}
      empty='roles'
      placeholder={t('columns.role')}
      value={props.value ? props.value : ''}
      setValue={(value) => props.setValue(value as Role)}
      itemToLabel={(role) => t(`roles.${role}`)}
      itemToValue={(role) => role}
      render={(role) => t(`roles.${role}`)}
    />
  );
}
