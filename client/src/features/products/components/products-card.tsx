import { useTranslations } from 'next-intl';
import { Card, Flex } from '@chakra-ui/react';
import { PAGE_TABS_MAP } from '@/config/navigation';
import { Product } from '../types';
import CardWrapper from '@/components/card-wrapper';
import ItemImageWithText from '@/components/item-image-with-text';
import CurrencyText from '@/components/currency-text';
import PlaceIconWithText from '@/components/place-icon-with-text';
import AmountBadge from '@/components/amount-badge';
import CustomAvatarWithText from '@/components/custom-avatar-with-text';
import ProductsActions from './products-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.products;
  product: Product;
};

export default function ProductsCard(props: Props) {
  const t = useTranslations();

  return (
    <CardWrapper>
      <Card.Header>
        <Flex justify='space-between'>
          <ItemImageWithText
            item={props.product.item}
            description={props.product.description}
          />
          <CurrencyText value={props.product.price} />
        </Flex>
      </Card.Header>
      <Card.Header>
        <Flex justify='space-between'>
          <PlaceIconWithText
            place={props.product.shop ?? props.product.rent!.plot}
          />
          <div>
            <AmountBadge
              amount={props.product.amount}
              unit={props.product.unit}
            />
          </div>
        </Flex>
      </Card.Header>
      <Card.Body>
        <CustomAvatarWithText
          user={props.product.user}
          value={t('columns.seller')}
        />
      </Card.Body>
      <Card.Footer justifyContent='flex-end'>
        <ProductsActions tab={props.tab} product={props.product} />
      </Card.Footer>
    </CardWrapper>
  );
}
