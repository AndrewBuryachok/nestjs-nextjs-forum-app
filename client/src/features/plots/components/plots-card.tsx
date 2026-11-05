import { useTranslations } from 'next-intl';
import { Card, Flex, SimpleGrid } from '@chakra-ui/react';
import { PAGE_TABS_MAP } from '@/config/navigation';
import { Plot } from '../types';
import CardWrapper from '@/components/card-wrapper';
import PlaceIconWithText from '@/components/place-icon-with-text';
import CurrencyText from '@/components/currency-text';
import CustomAvatarWithText from '@/components/custom-avatar-with-text';
import ExpireProgress from '@/components/expire-progress';
import PlotsActions from './plots-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.plots;
  plot: Plot;
};

export default function PlotsCard(props: Props) {
  const t = useTranslations();

  return (
    <CardWrapper>
      <Card.Header>
        <Flex justify='space-between'>
          <PlaceIconWithText place={props.plot} />
          <CurrencyText value={props.plot.price} />
        </Flex>
      </Card.Header>
      <Card.Body>
        <SimpleGrid columns={2}>
          <CustomAvatarWithText
            user={props.plot.user}
            value={t('columns.owner')}
          />
          {props.plot.rent && (
            <CustomAvatarWithText
              user={props.plot.rent.user}
              value={t('columns.renter')}
            />
          )}
        </SimpleGrid>
      </Card.Body>
      {props.plot.rent && (
        <Card.Footer>
          <ExpireProgress value={props.plot.rent.completedAt} />
        </Card.Footer>
      )}
      <Card.Footer justifyContent='flex-end'>
        <PlotsActions tab={props.tab} plot={props.plot} />
      </Card.Footer>
    </CardWrapper>
  );
}
