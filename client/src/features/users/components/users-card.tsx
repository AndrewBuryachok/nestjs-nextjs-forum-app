import { useTranslations } from 'next-intl';
import { Card, Flex, HStack, SimpleGrid } from '@chakra-ui/react';
import { PAGE_TABS_MAP } from '@/config/navigation';
import { User } from '../types';
import CardWrapper from '@/components/card-wrapper';
import CustomAvatarWithOnline from '@/components/custom-avatar-with-online';
import RolesBadge from '@/components/roles-badge';
import PlaceIconWithText from '@/components/place-icon-with-text';
import PlaceIcon from '@/components/place-icon';
import CustomText from '@/components/custom-text';
import CustomAvatarWithText from '@/components/custom-avatar-with-text';
import UsersActions from './users-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.users;
  user: User;
};

export default function UsersCard(props: Props) {
  const t = useTranslations();

  return (
    <CardWrapper>
      <Card.Header>
        <Flex justify='space-between'>
          <CustomAvatarWithOnline user={props.user} />
          <RolesBadge roles={props.user.roles} />
        </Flex>
      </Card.Header>
      <Card.Body>
        <SimpleGrid columns={2}>
          {props.user.town ? (
            <PlaceIconWithText place={props.user.town} />
          ) : (
            <HStack>
              <PlaceIcon />
              <div>
                <CustomText bold value='-' />
                <CustomText muted value={t('columns.town')} />
              </div>
            </HStack>
          )}
          {props.user.town && (
            <CustomAvatarWithText
              user={props.user.town.user}
              value={t('columns.mayor')}
            />
          )}
        </SimpleGrid>
      </Card.Body>
      <Card.Footer justifyContent='flex-end'>
        <UsersActions tab={props.tab} user={props.user} />
      </Card.Footer>
    </CardWrapper>
  );
}
