import { Input, InputGroup } from '@chakra-ui/react';
import { BaseUser } from '@/features/users/types';
import CustomAvatar from './custom-avatar';

type Props = {
  user: BaseUser;
};

export default function UserInput(props: Props) {
  return (
    <InputGroup startAddon={<CustomAvatar user={props.user} />}>
      <Input readOnly value={props.user.nick} />
    </InputGroup>
  );
}
