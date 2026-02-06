import { Input, InputGroup } from '@chakra-ui/react';
import { BaseUser } from '@/features/users/types';
import { BaseCard } from '@/features/cards/types';
import CustomAvatar from './custom-avatar';

type Props = {
  user: BaseUser;
  card: BaseCard;
};

export default function CardInput(props: Props) {
  const value = `${props.user.nick} - ${props.card.name}`;

  return (
    <InputGroup startAddon={<CustomAvatar user={props.user} />}>
      <Input readOnly value={value} />
    </InputGroup>
  );
}
