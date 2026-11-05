import { useTranslations } from 'next-intl';
import { Card, Flex } from '@chakra-ui/react';
import { PAGE_TABS_MAP } from '@/config/navigation';
import { Town } from '../types';
import CardWrapper from '@/components/card-wrapper';
import PlaceIconWithText from '@/components/place-icon-with-text';
import LevelBadge from '@/components/level-badge';
import CustomAvatarWithText from '@/components/custom-avatar-with-text';
import UsersProgress from './users-progress';
import ChunksProgress from './chunks-progress';
import TownsActions from './towns-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.towns;
  town: Town;
};

export default function TownsCard(props: Props) {
  const t = useTranslations();

  return (
    <CardWrapper>
      <Card.Header>
        <Flex justify='space-between'>
          <PlaceIconWithText place={props.town} />
          <div>
            <LevelBadge level={props.town.level} />
          </div>
        </Flex>
      </Card.Header>
      <Card.Body>
        <CustomAvatarWithText
          user={props.town.user}
          value={t('columns.mayor')}
        />
      </Card.Body>
      <Card.Footer>
        <UsersProgress level={props.town.level} users={props.town.users} />
        <ChunksProgress level={props.town.level} chunks={props.town.chunks} />
      </Card.Footer>
      <Card.Footer justifyContent='flex-end'>
        <TownsActions tab={props.tab} town={props.town} />
      </Card.Footer>
    </CardWrapper>
  );
}
