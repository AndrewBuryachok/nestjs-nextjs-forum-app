import { User } from '../types';
import TabsWrapper from '@/components/tabs-wrapper';
import EditUserProfileForm from './edit-user-profile-form';
import ChangeUserPasswordForm from './change-user-password-form';

type Props = {
  user: User;
};

export default function EditUserForm(props: Props) {
  const tabs = ['profile', 'password'];

  return (
    <TabsWrapper
      label='dialogs'
      value={tabs}
      render={(index) =>
        !index ? (
          <EditUserProfileForm user={props.user} />
        ) : (
          <ChangeUserPasswordForm user={props.user} />
        )
      }
    />
  );
}
