import { useTranslations } from 'next-intl';
import { Card, Flex, SimpleGrid } from '@chakra-ui/react';
import { PAGE_TABS_MAP } from '@/config/navigation';
import { Order } from '../types';
import CardWrapper from '@/components/card-wrapper';
import ItemImageWithText from '@/components/item-image-with-text';
import CurrencyText from '@/components/currency-text';
import PlaceIconWithText from '@/components/place-icon-with-text';
import AmountBadge from '@/components/amount-badge';
import CustomAvatarWithText from '@/components/custom-avatar-with-text';
import StatusProgress from './status-progress';
import OrdersActions from './orders-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.orders;
  order: Order;
};

export default function OrdersCard(props: Props) {
  const t = useTranslations();

  return (
    <CardWrapper>
      <Card.Header>
        <Flex justify='space-between'>
          <ItemImageWithText
            item={props.order.item}
            description={props.order.description}
          />
          <CurrencyText value={props.order.sum} />
        </Flex>
      </Card.Header>
      <Card.Header>
        <Flex justify='space-between'>
          <PlaceIconWithText
            place={props.order.locker}
            cell={props.order.cell}
          />
          <div>
            <AmountBadge amount={props.order.amount} unit={props.order.unit} />
          </div>
        </Flex>
      </Card.Header>
      <Card.Body>
        <SimpleGrid columns={2}>
          <CustomAvatarWithText
            user={props.order.customerUser}
            value={t('columns.customer')}
          />
          {props.order.executorUser && (
            <CustomAvatarWithText
              user={props.order.executorUser}
              value={t('columns.executor')}
            />
          )}
        </SimpleGrid>
      </Card.Body>
      <Card.Footer>
        <StatusProgress status={props.order.status} />
      </Card.Footer>
      <Card.Footer justifyContent='flex-end'>
        <OrdersActions tab={props.tab} order={props.order} />
      </Card.Footer>
    </CardWrapper>
  );
}
