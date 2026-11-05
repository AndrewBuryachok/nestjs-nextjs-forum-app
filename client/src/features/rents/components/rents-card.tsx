import { useTranslations } from 'next-intl';
import { Card, Flex, SimpleGrid } from '@chakra-ui/react';
import { PAGE_TABS_MAP } from '@/config/navigation';
import { Rent } from '../types';
import CardWrapper from '@/components/card-wrapper';
import PlaceIconWithText from '@/components/place-icon-with-text';
import CurrencyText from '@/components/currency-text';
import CustomAvatarWithText from '@/components/custom-avatar-with-text';
import ExpireProgress from '@/components/expire-progress';
import RentsActions from './rents-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.rents;
  rent: Rent;
};

export default function RentsCard(props: Props) {
  const t = useTranslations();

  return (
    <CardWrapper>
      <Card.Header>
        <Flex justify='space-between'>
          <PlaceIconWithText place={props.rent.plot} />
          <CurrencyText value={props.rent.plot.price} />
        </Flex>
      </Card.Header>
      <Card.Body>
        <SimpleGrid columns={2}>
          <CustomAvatarWithText
            user={props.rent.user}
            value={t('columns.renter')}
          />
          <CustomAvatarWithText
            user={props.rent.plot.user}
            value={t('columns.owner')}
          />
        </SimpleGrid>
      </Card.Body>
      <Card.Footer>
        <ExpireProgress value={props.rent.completedAt} />
      </Card.Footer>
      <Card.Footer justifyContent='flex-end'>
        <RentsActions tab={props.tab} rent={props.rent} />
      </Card.Footer>
    </CardWrapper>
  );
}
