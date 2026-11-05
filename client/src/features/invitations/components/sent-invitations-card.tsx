import { Card, Flex } from '@chakra-ui/react';
import { User } from '../../users/types';
import CardWrapper from '@/components/card-wrapper';
import CustomAvatarWithUser from '@/components/custom-avatar-with-user';
import RolesBadge from '@/components/roles-badge';
import SentInvitationsActions from './sent-invitations-actions';

type Props = {
  user: User;
};

export default function SentInvitationsCard(props: Props) {
  return (
    <CardWrapper>
      <Card.Body>
        <Flex justify='space-between'>
          <CustomAvatarWithUser user={props.user} />
          <RolesBadge roles={props.user.roles} />
        </Flex>
      </Card.Body>
      <Card.Footer justifyContent='flex-end'>
        <SentInvitationsActions user={props.user} />
      </Card.Footer>
    </CardWrapper>
  );
}
