import { useTranslations } from 'next-intl';
import { Card, Flex } from '@chakra-ui/react';
import { Town } from '../../towns/types';
import CardWrapper from '@/components/card-wrapper';
import PlaceIconWithText from '@/components/place-icon-with-text';
import LevelBadge from '@/components/level-badge';
import CustomAvatarWithText from '@/components/custom-avatar-with-text';
import SentApplicationsActions from './sent-applications-actions';

type Props = {
  town: Town;
};

export default function SentApplicationsCard(props: Props) {
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
      <Card.Footer justifyContent='flex-end'>
        <SentApplicationsActions town={props.town} />
      </Card.Footer>
    </CardWrapper>
  );
}
