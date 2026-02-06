import { Input, InputGroup } from '@chakra-ui/react';
import { BaseCard } from '@/features/cards/types';
import CustomAvatar from './custom-avatar';

type Props = {
  card: BaseCard;
};

export default function CardInput(props: Props) {
  const value = `${props.card.user.nick} - ${props.card.account.name}`;

  return (
    <InputGroup startAddon={<CustomAvatar user={props.card.user} />}>
      <Input readOnly value={value} />
    </InputGroup>
  );
}
