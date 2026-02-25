import { HStack, Skeleton } from '@chakra-ui/react';
import { BaseUser } from '../types';
import CustomAvatarWithUser from '@/components/custom-avatar-with-user';

type Props = {
  users?: BaseUser[];
  isLoading: boolean;
};

export default function UsersList(props: Props) {
  return (
    <>
      {props.isLoading &&
        Array.from({ length: 5 }).map((_, i) => (
          <HStack key={i}>
            <Skeleton h='8' w='8' />
            <Skeleton h='4' w='32' />
          </HStack>
        ))}
      {props.users?.map((user) => (
        <CustomAvatarWithUser key={user.id} user={user} />
      ))}
    </>
  );
}
