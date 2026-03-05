import { PAGE_TABS_MAP } from '@/config/navigation';
import { Product } from '../types';
import { viewProductAction } from '../actions/view-product-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.products;
  product: Product;
};

export default function ProductsActions(props: Props) {
  return (
    <CustomActions
      actions={[viewProductAction].map((action) => action(props.product))}
    />
  );
}
