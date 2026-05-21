import { Avatar } from '@chakra-ui/react';
import { BaseUser } from '@/features/users/types';
import OnlineCircle from './online-circle';

type Props = {
  user: BaseUser;
  withoutOnline?: boolean;
};

export default function CustomAvatar(props: Props) {
  const username = props.user.avatar || props.user.nick;

  const src = `https://minotar.net/helm/${username}/8.png`;

  return (
    <Avatar.Root borderRadius='sm' size='xs'>
      <Avatar.Fallback name={props.user.nick} />
      <Avatar.Image borderRadius='sm' imageRendering='pixelated' src={src} />
      {!props.withoutOnline && <OnlineCircle userId={props.user.id} />}
    </Avatar.Root>
  );
}
