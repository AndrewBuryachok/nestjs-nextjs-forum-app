import { HStack } from '@chakra-ui/react';
import { BaseUser } from '@/features/users/types';
import CustomAvatar from './custom-avatar';
import CustomText from './custom-text';

type Props = {
  user: BaseUser;
};

export default function CustomAvatarWithUser(props: Props) {
  return (
    <HStack>
      <CustomAvatar user={props.user} />
      <CustomText value={props.user.nick} />
    </HStack>
  );
}
