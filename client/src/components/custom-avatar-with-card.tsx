import { HStack } from '@chakra-ui/react';
import { BaseCard } from '@/features/cards/types';
import CustomAvatar from './custom-avatar';
import CustomText from './custom-text';

type Props = {
  card: BaseCard;
};

export default function CustomAvatarWithCard(props: Props) {
  return (
    <HStack>
      <CustomAvatar user={props.card.user} />
      <div>
        <CustomText value={props.card.user.nick} />
        <CustomText muted value={props.card.account.name} />
      </div>
    </HStack>
  );
}
