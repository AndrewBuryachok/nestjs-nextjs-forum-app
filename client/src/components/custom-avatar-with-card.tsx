import { HStack } from '@chakra-ui/react';
import { BaseUser } from '@/features/users/types';
import { BaseCard } from '@/features/cards/types';
import CustomAvatar from './custom-avatar';
import CustomText from './custom-text';

type Props = {
  user: BaseUser;
  card: BaseCard;
};

export default function CustomAvatarWithCard(props: Props) {
  return (
    <HStack>
      <CustomAvatar user={props.user} />
      <div>
        <CustomText value={props.user.nick} />
        <CustomText muted value={props.card.name} />
      </div>
    </HStack>
  );
}
