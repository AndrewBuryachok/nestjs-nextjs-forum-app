import { PAGE_TABS_MAP } from '@/config/navigation';
import { Product } from '../types';
import { viewProductAction } from '../actions/view-product-action';
import {
  editMyProductAction,
  editUserProductAction,
} from '../actions/edit-product-action';
import {
  deleteMyProductAction,
  deleteUserProductAction,
} from '../actions/delete-product-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.products;
  product: Product;
};

export default function ProductsActions(props: Props) {
  const actions = {
    main: [],
    my: [editMyProductAction, deleteMyProductAction],
    all: [editUserProductAction, deleteUserProductAction],
  }[props.tab];

  return (
    <CustomActions
      actions={[viewProductAction, ...actions].map((action) =>
        action(props.product),
      )}
    />
  );
}
