import { PAGE_TABS_MAP } from '@/config/navigation';
import { Product } from '../types';
import CustomTable from '@/components/custom-table';
import CustomAvatarWithCard from '@/components/custom-avatar-with-card';
import ItemImageWithText from '@/components/item-image-with-text';
import AmountText from '@/components/amount-text';
import CurrencyText from '@/components/currency-text';
import PlaceText from '@/components/place-text';
import DateText from '@/components/date-text';
import ProductsActions from './products-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.products;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function ProductsTable(props: Props) {
  return (
    <CustomTable<Product>
      page='products'
      tab={props.tab}
      searchParams={props.searchParams}
      columns={[
        {
          value: 'seller',
          render: (product) => (
            <CustomAvatarWithCard user={product.user} card={product.card} />
          ),
        },
        {
          value: 'item',
          render: (product) => (
            <ItemImageWithText
              item={product.item}
              description={product.description}
            />
          ),
        },
        {
          value: 'amount',
          render: (product) => (
            <AmountText value={[product.amount, product.batch, product.unit]} />
          ),
        },
        {
          value: 'price',
          render: (product) => <CurrencyText value={product.price} />,
        },
        {
          value: 'shop',
          render: (product) => (
            <PlaceText place={product.shop ?? product.rent!.plot} />
          ),
        },
        {
          value: 'created',
          render: (product) => <DateText value={product.createdAt} />,
        },
        {
          value: 'actions',
          render: (product) => (
            <ProductsActions tab={props.tab} product={product} />
          ),
        },
      ]}
    />
  );
}
