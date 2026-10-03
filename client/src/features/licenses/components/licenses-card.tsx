import { Card, Flex } from '@chakra-ui/react';
import { User } from '@/features/users/types';
import CardWrapper from '@/components/card-wrapper';
import CustomAvatarWithOnline from '@/components/custom-avatar-with-online';
import RolesBadge from '@/components/roles-badge';
import LicensesActions from './licenses-actions';

type Props = {
  user: User;
};

export default function LicensesCard(props: Props) {
  return (
    <CardWrapper>
      <Card.Body>
        <Flex justify='space-between'>
          <CustomAvatarWithOnline user={props.user} />
          <RolesBadge roles={props.user.roles} />
        </Flex>
      </Card.Body>
      <Card.Footer justifyContent='flex-end'>
        <LicensesActions user={props.user} />
      </Card.Footer>
    </CardWrapper>
  );
}
