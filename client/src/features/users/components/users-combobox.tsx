import { BaseUser } from '../types';
import NumberCombobox from '@/components/number-combobox';
import CustomAvatar from '@/components/custom-avatar';
import CustomAvatarWithUser from '@/components/custom-avatar-with-user';

type Props = {
  data?: BaseUser[];
  loading?: boolean;
  placeholder: string;
  value: number;
  setValue: (value: number) => void;
};

export default function UsersCombobox(props: Props) {
  return (
    <NumberCombobox
      data={props.data}
      loading={props.loading}
      empty='users'
      placeholder={props.placeholder}
      start={(user) => <CustomAvatar user={user} />}
      value={props.value}
      setValue={props.setValue}
      itemToLabel={(user) => user.nick}
      itemToValue={(user) => user.id}
      render={(user) => <CustomAvatarWithUser user={user} />}
    />
  );
}
