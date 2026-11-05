import { Card, Flex } from '@chakra-ui/react';
import { PAGE_TABS_MAP } from '@/config/navigation';
import { User } from '../../users/types';
import CardWrapper from '@/components/card-wrapper';
import CustomAvatarWithUser from '@/components/custom-avatar-with-user';
import RolesBadge from '@/components/roles-badge';
import ResidentsActions from './residents-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.residents;
  user: User;
};

export default function ResidentsCard(props: Props) {
  return (
    <CardWrapper>
      <Card.Body>
        <Flex justify='space-between'>
          <CustomAvatarWithUser user={props.user} />
          <RolesBadge roles={props.user.roles} />
        </Flex>
      </Card.Body>
      <Card.Footer justifyContent='flex-end'>
        <ResidentsActions tab={props.tab} user={props.user} />
      </Card.Footer>
    </CardWrapper>
  );
}
