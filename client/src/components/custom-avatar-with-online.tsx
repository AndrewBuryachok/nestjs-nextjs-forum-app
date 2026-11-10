import { BaseUser } from '@/features/users/types';
import CustomAvatarWithText from './custom-avatar-with-text';
import OnlineText from './online-text';

type Props = {
  user: BaseUser & { onlineAt: Date };
};

export default function CustomAvatarWithOnline(props: Props) {
  return (
    <CustomAvatarWithText
      user={props.user}
      value={<OnlineText id={props.user.id} value={props.user.onlineAt} />}
    />
  );
}
