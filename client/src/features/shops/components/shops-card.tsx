import { useTranslations } from 'next-intl';
import { Card } from '@chakra-ui/react';
import { PAGE_TABS_MAP } from '@/config/navigation';
import { Shop } from '../types';
import CardWrapper from '@/components/card-wrapper';
import PlaceIconWithText from '@/components/place-icon-with-text';
import CustomAvatarWithText from '@/components/custom-avatar-with-text';
import ShopsActions from './shops-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.shops;
  shop: Shop;
};

export default function ShopsCard(props: Props) {
  const t = useTranslations();

  return (
    <CardWrapper>
      <Card.Header>
        <PlaceIconWithText place={props.shop} />
      </Card.Header>
      <Card.Body>
        <CustomAvatarWithText
          user={props.shop.user}
          value={t('columns.owner')}
        />
      </Card.Body>
      <Card.Footer justifyContent='flex-end'>
        <ShopsActions tab={props.tab} shop={props.shop} />
      </Card.Footer>
    </CardWrapper>
  );
}
