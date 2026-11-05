import { HStack } from '@chakra-ui/react';
import { BaseUser } from '@/features/users/types';
import CustomAvatar from './custom-avatar';
import CustomText from './custom-text';

type Props = {
  user: BaseUser;
  value: string;
};

export default function CustomAvatarWithText(props: Props) {
  return (
    <HStack>
      <CustomAvatar user={props.user} />
      <div>
        <CustomText bold value={props.user.nick} />
        <CustomText muted value={props.value} />
      </div>
    </HStack>
  );
}
